import React, { useState } from 'react';
import './Preview.css';

function Preview({ formData, visibleSections, onClose }) {
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [pdfError, setPdfError] = useState(null);

    const isEducationEmpty = (education) =>
        !education.length || education.every(edu =>
            !edu.school && !edu.location && !edu.degree && !edu.date
        );
    const isExperienceEmpty = (experience) =>
        !experience.length || experience.every(exp =>
            !exp.title && !exp.company && !exp.location &&
            (!exp.points || exp.points.every(point => !point))
        );
    const isProjectsEmpty = (projects) =>
        !projects.length || projects.every(proj =>
            !proj.name && !proj.technologies && !proj.date &&
            (!proj.points || proj.points.every(point => !point))
        );
    const isSkillsEmpty = (skills) =>
        !skills.languages && !skills.frameworks &&
        !skills.developer_tools && !skills.libraries;

    const cleanEducation = formData.education.filter(edu =>
        edu.school || edu.location || edu.degree || edu.startDate || edu.endDate
    );

    const cleanExperience = formData.experience.map(exp => ({
        ...exp,
        points: (exp.points || []).filter(point => point.trim())
    })).filter(exp => exp.title || exp.company || exp.startDate || exp.endDate);

    const cleanProjects = formData.projects.map(proj => ({
        ...proj,
        points: (proj.points || []).filter(point => point.trim())
    })).filter(proj => proj.name || proj.startDate || proj.endDate);

    const canGeneratePdf = () => {
        let hasAtLeastOneVisibleAndFilledSection = false;

        if (visibleSections.personal) {
            if (!formData.personal.name) return false;
            hasAtLeastOneVisibleAndFilledSection = true;
        }
        if (visibleSections.education) {
            if (cleanEducation.length === 0) return false;
            hasAtLeastOneVisibleAndFilledSection = true;
        }
        if (visibleSections.experience) {
            if (cleanExperience.length === 0) return false;
            hasAtLeastOneVisibleAndFilledSection = true;
        }
        if (visibleSections.projects) {
            if (cleanProjects.length === 0) return false;
            hasAtLeastOneVisibleAndFilledSection = true;
        }
        if (visibleSections.skills) {
            if (isSkillsEmpty(formData.skills)) return false;
            hasAtLeastOneVisibleAndFilledSection = true;
        }
        
        return hasAtLeastOneVisibleAndFilledSection;
    };
    const isPdfGenerationPossible = canGeneratePdf();

    const handleGeneratePdf = async () => {
    if (!isPdfGenerationPossible) {
        setPdfError("Please fill in all visible sections before generating a PDF.");
        return;
    }
    setIsGeneratingPdf(true);
    setPdfError(null);
    try {
        const response = await fetch('/api/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData, visibleSections }),
        });

        console.log('Response status:', response.status);
        console.log('Response content-type:', response.headers.get('content-type'));

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to generate PDF. Ensure the backend is running and the endpoint is correctly implemented.' }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/pdf')) {
            const text = await response.text();
            console.error('Expected PDF but got:', text);
            throw new Error('Invalid response from server. Expected a PDF file.');
        }

        const blob = await response.blob();

        if (blob.type !== 'application/pdf') {
            throw new Error('Invalid blob type. Expected a PDF file.');
        }

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(formData.personal.name || 'resume').replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        setPdfError(error.message);
    } finally {
        setIsGeneratingPdf(false);
    }
};

    const formatMonth = (dateStr) => {
        if (!dateStr) return '';
        const [year, month] = dateStr.split('-');
        if (!year || !month) return dateStr;
        const monthNames = [
            '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return `${monthNames[parseInt(month, 10)]} ${year}`;
    };

    const isSectionFilled = (sectionName) => {
        if (!visibleSections[sectionName]) return true; // If not visible, it's "filled" for this check

        switch (sectionName) {
            case 'education':
                return cleanEducation.length > 0 && !isEducationEmpty(formData.education);
            case 'experience':
                return cleanExperience.length > 0 && !isExperienceEmpty(formData.experience);
            case 'projects':
                return cleanProjects.length > 0 && !isProjectsEmpty(formData.projects);
            case 'skills':
                return !isSkillsEmpty(formData.skills);
            default:
                return true;
        }
    };

    return (
        <div className="preview-overlay">
            <div className="preview-content" style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '1.05rem', letterSpacing: '0.01em' }}>
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="resume-preview">
                    <div className="resume-header" style={{ textAlign: 'center', marginBottom: '1.2em' }}>
                        <h1 className="name" style={{ fontSize: '2.1em', fontWeight: 700, letterSpacing: '0.01em', marginBottom: '0.2em' }}>{formData.personal.name}</h1>
                        <div className="contact-info" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5em', fontSize: '1em' }}>
                            {formData.personal.phone && <span>{formData.personal.phone}</span>}
                            {formData.personal.phone && (formData.personal.email || formData.personal.linkedIn || formData.personal.github) && <span className="separator">|</span>}
                            {formData.personal.email && <a href={`mailto:${formData.personal.email}`} style={{ textDecoration: 'underline', color: 'inherit', margin: '0 2px' }}>{formData.personal.email}</a>}
                            {formData.personal.email && (formData.personal.linkedIn || formData.personal.github) && <span className="separator">|</span>}
                            {formData.personal.linkedIn && <a href={formData.personal.linkedIn} style={{ textDecoration: 'underline', color: 'inherit', margin: '0 2px' }}>{formData.personal.linkedIn.replace(/^https?:\/\//, '')}</a>}
                            {formData.personal.linkedIn && formData.personal.github && <span className="separator">|</span>}
                            {formData.personal.github && <a href={formData.personal.github} style={{ textDecoration: 'underline', color: 'inherit', margin: '0 2px' }}>{formData.personal.github.replace(/^https?:\/\//, '')}</a>}
                        </div>
                    </div>
                    {visibleSections.education && cleanEducation.length > 0 && (
                        <section className="resume-section">
                            <h2>Education</h2>
                            {cleanEducation.map((edu, idx) => (
                                edu.school && (
                                    <div key={idx} className="education-item" style={{ display: 'flex', flexDirection: 'column', marginBottom: '0.5em' }}>
                                        <div className="header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
                                            <strong style={{ flex: 1, textAlign: 'left' }}>{edu.school}</strong>
                                            <span style={{ minWidth: '120px', textAlign: 'right', color: '#444', fontStyle: 'italic', fontWeight: 400 }}>{edu.location}</span>
                                        </div>
                                        <div className="sub-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
                                            <em style={{ flex: 1, textAlign: 'left' }}>{edu.degree}</em>
                                            <em style={{ minWidth: '120px', textAlign: 'right', color: '#444' }}>{(edu.startDate && edu.endDate) ? `${formatMonth(edu.startDate)} -- ${formatMonth(edu.endDate)}` : formatMonth(edu.startDate) || formatMonth(edu.endDate) || ''}</em>
                                        </div>
                                    </div>
                                )
                            ))}
                        </section>
                    )}
                    {visibleSections.experience && !isExperienceEmpty(formData.experience) && (
                        <section className="resume-section">
                            <h2>Experience</h2>
                            {cleanExperience.map((exp, idx) => (
                                <div key={idx} className="experience-item" style={{ display: 'flex', flexDirection: 'column', marginBottom: '0.7em' }}>
                                    <div className="header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
                                        <strong style={{ flex: 1, textAlign: 'left' }}>{exp.title}</strong>
                                        <span style={{ minWidth: '120px', textAlign: 'right', color: '#444', fontStyle: 'italic', fontWeight: 400 }}>{(exp.startDate && exp.endDate) ? `${formatMonth(exp.startDate)} -- ${formatMonth(exp.endDate)}` : formatMonth(exp.startDate) || formatMonth(exp.endDate) || ''}</span>
                                    </div>
                                    <div className="sub-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
                                        <em style={{ flex: 1, textAlign: 'left' }}>{exp.company}</em>
                                        <em style={{ minWidth: '120px', textAlign: 'right', color: '#444' }}>{exp.location}</em>
                                    </div>
                                    {exp.points.length > 0 && (
                                        <ul style={{ marginLeft: '1.2em', marginTop: '0.2em' }}>
                                            {exp.points.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}
                    {visibleSections.projects && !isProjectsEmpty(formData.projects) && (
                        <section className="resume-section">
                            <h2>Projects</h2>
                            {cleanProjects.map((proj, idx) => (
                                <div key={idx} className="project-item">
                                    <div className="header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
                                        <strong style={{ flex: 1, textAlign: 'left' }}>{proj.name}</strong>
                                        <span className="project-tech" style={{ minWidth: '120px', textAlign: 'right', color: '#444', fontStyle: 'italic', fontWeight: 400 }}>{proj.technologies}</span>
                                    </div>
                                    {(proj.startDate || proj.endDate) && (
                                        <div className="sub-row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', width: '100%' }}>
                                            <em style={{ minWidth: '120px', textAlign: 'right', color: '#444' }}>{(proj.startDate && proj.endDate) ? `${formatMonth(proj.startDate)} -- ${formatMonth(proj.endDate)}` : formatMonth(proj.startDate) || formatMonth(proj.endDate) || ''}</em>
                                        </div>
                                    )}
                                    {proj.points.length > 0 && (
                                        <ul>
                                            {proj.points.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}
                    {visibleSections.skills && !isSkillsEmpty(formData.skills) && (
                        <section className="resume-section">
                            <h2>Technical Skills</h2>
                            <div className="skills-grid">
                                {formData.skills.languages && (
                                    <div className="skill-row">
                                        <strong>Languages:</strong> {formData.skills.languages}
                                    </div>
                                )}
                                {formData.skills.frameworks && (
                                    <div className="skill-row">
                                        <strong>Frameworks:</strong> {formData.skills.frameworks}
                                    </div>
                                )}
                                {formData.skills.developer_tools && (
                                    <div className="skill-row">
                                        <strong>Developer Tools:</strong> {formData.skills.developer_tools}
                                    </div>
                                )}
                                {formData.skills.libraries && (
                                    <div className="skill-row">
                                        <strong>Libraries:</strong> {formData.skills.libraries}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
                <div className="preview-actions">
                    <button 
                        className="generate-pdf-btn" 
                        onClick={handleGeneratePdf} 
                        disabled={!isPdfGenerationPossible || isGeneratingPdf}
                    >
                        {isGeneratingPdf ? 'Generating...' : 'Generate PDF'}
                    </button>
                    {pdfError && <p className="pdf-error-message" style={{ color: 'red', marginTop: '10px', fontSize: '0.9em' }}>Error: {pdfError}</p>}
                </div>
            </div>
        </div>
    );
}

export default Preview;