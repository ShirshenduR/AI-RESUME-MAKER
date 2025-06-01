require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require("@google/genai");
const fs = require('fs');
const path = require('path');
const latex = require('node-latex');
const { exec } = require('child_process');
const { Readable } = require('stream');
const { latexEscape } = require('./utils/latexEscape');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const app = express();

// Trust Render proxy
app.set('trust proxy', 1);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.options('*', cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// AI route for generating bullet points
app.post('/ai/generate-bullets', async (req, res) => {
  const { name, technologies, description } = req.body;
  if (!name || !technologies || !description) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  try {
    const prompt = `You are an expert resume writer. Given the following project details, generate 3-5 concise, impactful resume bullet points (in plain text, no numbering, no markdown, no extra text):\n\nProject Name: ${name}\nTechnologies: ${technologies}\nDescription: ${description}\n\nBullet Points:`;

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });

    const text = result.text || '';
    const bullets = text.split(/\n|\r/).map(line => line.replace(/^[-\u2022*\d.\s]+/, '').trim()).filter(Boolean);
    res.json({ bullets });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to generate bullet points.' });
  }
});

// PDF generation route
app.post('/api/generate-pdf', async (req, res) => {
  const { formData, visibleSections } = req.body;

  if (!formData || !visibleSections) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  try {
    const latexContent = generateLatexContent(formData, visibleSections);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${latexEscape(formData.personal.name || 'resume')}.pdf"`);

    const inputStream = Readable.from([latexContent]);
    const pdfStream = latex(inputStream);

    pdfStream.on('error', (err) => {
      console.error('LaTeX compile error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to compile LaTeX to PDF' });
      } else {
        res.end();
      }
    });

    res.on('close', () => {
      pdfStream.destroy();
    });

    pdfStream.pipe(res);
  } catch (error) {
    console.error('PDF generation error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate PDF: ' + error.message });
    }
  }
});

function generateLatexContent(formData, visibleSections) {
    const formatMonth = (dateStr) => {
        if (!dateStr) return '';
        const [year, month] = dateStr.split('-');
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    let latex = `\\documentclass[letterpaper,11pt]{article}
\\usepackage[left=0.75in,top=0.75in,right=0.75in,bottom=0.75in]{geometry}
\\usepackage{enumitem}
\\usepackage{times}
\\usepackage{hyperref}
\\usepackage{xcolor}

\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}
\\renewcommand{\\baselinestretch}{1.0}

\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    urlcolor=blue,
    pdfborder={0 0 0}
}

\\begin{document}

`;

    if (visibleSections.personal && formData.personal) {
        if (formData.personal.name) {
            latex += `{\\centering \\huge \\textbf{${latexEscape(formData.personal.name)}} \\\\[0.1cm]}

`;
        }
        
        const contactInfo = [];
        if (formData.personal.email) contactInfo.push(`\\href{mailto:${latexEscape(formData.personal.email)}}{${latexEscape(formData.personal.email)}}`);
        if (formData.personal.phone) contactInfo.push(latexEscape(formData.personal.phone));
        if (formData.personal.address) contactInfo.push(latexEscape(formData.personal.address));
        if (formData.personal.linkedIn) contactInfo.push(`\\href{${latexEscape(formData.personal.linkedIn)}}{${latexEscape(formData.personal.linkedIn)}}`);
        if (formData.personal.github) contactInfo.push(`\\href{${latexEscape(formData.personal.github)}}{${latexEscape(formData.personal.github)}}`);
        
        if (contactInfo.length > 0) {
            latex += `{\\centering ${contactInfo.join(' $\\mid$ ')} \\\\[0.3cm]}

`;
        }
    }

    if (visibleSections.education && formData.education && formData.education.length > 0) {
        const validEducation = formData.education.filter(edu => edu.school || edu.degree || edu.startDate || edu.endDate);
        if (validEducation.length > 0) {
            latex += `\\section*{\\textbf{EDUCATION}}
\\hrule
\\vspace{0.2cm}

`;
            validEducation.forEach(edu => {
                const startDate = formatMonth(edu.startDate);
                const endDate = formatMonth(edu.endDate);
                const dateRange = [startDate, endDate].filter(Boolean).join(' - ') || '';
                
                latex += `\\textbf{${latexEscape(edu.school || '')}}`;
                if (edu.location) latex += ` \\hfill ${latexEscape(edu.location)}`;
                latex += ` \\\\
`;
                
                if (edu.degree) {
                    latex += `${latexEscape(edu.degree)}`;
                    if (dateRange) latex += ` \\hfill ${latexEscape(dateRange)}`;
                    latex += ` \\\\[0.3cm]
`;
                }
            });
        }
    }

    if (visibleSections.experience && formData.experience && formData.experience.length > 0) {
        const validExperience = formData.experience.filter(exp => exp.company || exp.title || exp.startDate || exp.endDate);
        if (validExperience.length > 0) {
            latex += `\\section*{\\textbf{EXPERIENCE}}
\\hrule
\\vspace{0.2cm}

`;
            validExperience.forEach(exp => {
                const startDate = formatMonth(exp.startDate);
                const endDate = formatMonth(exp.endDate);
                const dateRange = [startDate, endDate].filter(Boolean).join(' - ') || '';
                
                latex += `\\textbf{${latexEscape(exp.title || '')}}`;
                if (dateRange) latex += ` \\hfill ${latexEscape(dateRange)}`;
                latex += ` \\\\
`;
                
                if (exp.company) {
                    latex += `\\textit{${latexEscape(exp.company)}}`;
                    if (exp.location) latex += ` \\hfill ${latexEscape(exp.location)}`;
                    latex += ` \\\\
`;
                }
                
                if (exp.points && exp.points.length > 0) {
                    const validPoints = exp.points.filter(point => point.trim());
                    if (validPoints.length > 0) {
                        latex += `\\begin{itemize}[leftmargin=0.15in, topsep=0pt, partopsep=0pt, itemsep=2pt]
`;
                        validPoints.forEach(point => {
                            latex += `\\item ${latexEscape(point.trim())}
`;
                        });
                        latex += `\\end{itemize}
`;
                    }
                }
                latex += `\\vspace{0.2cm}
`;
            });
        }
    }

    if (visibleSections.projects && formData.projects && formData.projects.length > 0) {
        const validProjects = formData.projects.filter(proj => proj.name || proj.startDate || proj.endDate);
        if (validProjects.length > 0) {
            latex += `\\section*{\\textbf{PROJECTS}}
\\hrule
\\vspace{0.2cm}

`;
            validProjects.forEach(proj => {
                const startDate = formatMonth(proj.startDate);
                const endDate = formatMonth(proj.endDate);
                const dateRange = [startDate, endDate].filter(Boolean).join(' - ') || '';
                
                latex += `\\textbf{${latexEscape(proj.name || '')}}`;
                if (dateRange) latex += ` \\hfill ${latexEscape(dateRange)}`;
                latex += ` \\\\
`;
                
                if (proj.technologies) {
                    latex += `\\textit{Technologies: ${latexEscape(proj.technologies)}} \\\\
`;
                }
                
                if (proj.points && proj.points.length > 0) {
                    const validPoints = proj.points.filter(point => point.trim());
                    if (validPoints.length > 0) {
                        latex += `\\begin{itemize}[leftmargin=0.15in, topsep=0pt, partopsep=0pt, itemsep=2pt]
`;
                        validPoints.forEach(point => {
                            latex += `\\item ${latexEscape(point.trim())}
`;
                        });
                        latex += `\\end{itemize}
`;
                    }
                }
                latex += `\\vspace{0.2cm}
`;
            });
        }
    }

    if (visibleSections.skills && formData.skills) {
        const skillCategories = [];
        if (formData.skills.languages) skillCategories.push(`\\textbf{Programming Languages:} ${latexEscape(formData.skills.languages)}`);
        if (formData.skills.frameworks) skillCategories.push(`\\textbf{Frameworks:} ${latexEscape(formData.skills.frameworks)}`);
        if (formData.skills.developer_tools) skillCategories.push(`\\textbf{Developer Tools:} ${latexEscape(formData.skills.developer_tools)}`);
        if (formData.skills.libraries) skillCategories.push(`\\textbf{Libraries:} ${latexEscape(formData.skills.libraries)}`);
        
        if (skillCategories.length > 0) {
            latex += `\\section*{\\textbf{TECHNICAL SKILLS}}
\\hrule
\\vspace{0.2cm}

`;
            skillCategories.forEach(category => {
                latex += `${category} \\\\
`;
            });
        }
    }

    latex += `\\end{document}`;
    
    return latex;
}



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));