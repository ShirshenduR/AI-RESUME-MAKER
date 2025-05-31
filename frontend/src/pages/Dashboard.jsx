import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Preview from '../components/Preview';

function Dashboard() {
    const [activeSection, setActiveSection] = useState('personal');
    const [user, setUser] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        personal: {
            name: '',
            email: '',
            phone: '',
            address: '',
            linkedIn: '',
            github: ''
        },
        education: [{
            school: '',
            location: '',
            degree: '',
            date: ''
        }],
        experience: [{
            title: '',
            date: '',
            company: '',
            location: '',
            points: ['']
        }],
        projects: [{
            name: '',
            technologies: '',
            date: '',
            points: ['']
        }],
        skills: {
            languages: '',
            frameworks: '',
            developer_tools: '',
            libraries: ''
        }
    });

    const [visibleSections, setVisibleSections] = useState({
        personal: true,
        education: true,
        experience: true,
        projects: true,
        skills: true
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/success`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('authentication failed');
                }
                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
         window.open(`${import.meta.env.VITE_API_URL}/auth/logout`, "_self");
        setUser(null);
        navigate('/login');
    };

    const handleInputChange = (section, field, value, index = null, pointIndex = null) => {
        setFormData(prev => {
            const newData = { ...prev };
            if (Array.isArray(prev[section])) {
                if (field === 'points' && pointIndex !== null) {
                    newData[section][index].points = [
                        ...prev[section][index].points.slice(0, pointIndex),
                        value,
                        ...prev[section][index].points.slice(pointIndex + 1)
                    ];
                } else {
                    newData[section] = prev[section].map((item, i) => 
                        i === index ? { ...item, [field]: value } : item
                    );
                }
            } else {
                newData[section] = {
                    ...prev[section],
                    [field]: value
                };
            }
            return newData;
        });
    };

    const addEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, { school: '', location: '', degree: '', date: '' }]
        }));
    };

    const addExperience = () => {
        setFormData(prev => ({
            ...prev,
            experience: [...prev.experience, { title: '', date: '', company: '', location: '', points: [''] }]
        }));
    };

    const addProject = () => {
        setFormData(prev => ({
            ...prev,
            projects: [...prev.projects, { name: '', technologies: '', date: '', points: [''] }]
        }));
    };

    const addBulletPoint = (section, index) => {
        setFormData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) => 
                i === index 
                    ? { ...item, points: [...item.points, ''] }
                    : item
            )
        }));
    };

    const removeBulletPoint = (section, itemIndex, pointIndex) => {
        setFormData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) => 
                i === itemIndex 
                    ? { 
                        ...item, 
                        points: item.points.filter((_, pIndex) => pIndex !== pointIndex)
                    }
                    : item
            )
        }));
    };

    const toggleSection = (section) => {
        setVisibleSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleAIBulletPoints = async (index) => {
        const proj = formData.projects[index];
        if (!proj.name || !proj.technologies || !proj.description) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/ai/generate-bullets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: proj.name,
                    technologies: proj.technologies,
                    description: proj.description
                })
            });
            const data = await response.json();
            if (data.bullets && Array.isArray(data.bullets)) {
                setFormData(prev => {
                    const newProjects = prev.projects.map((p, i) =>
                        i === index ? { ...p, points: data.bullets } : p
                    );
                    return { ...prev, projects: newProjects };
                });
            } else {
                alert('AI did not return bullet points.');
            }
        } catch (err) {
            alert('Failed to generate AI bullet points.');
        }
    };

    return (
        <div className="dashboard">
            <nav className="dashboard-nav">
                <Link to="/" className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="59" height="56" viewBox="0 0 59 56" fill="none">
                        <path d="M31.9167 4.66667H15C13.7181 4.66667 12.4887 5.15833 11.5823 6.0335C10.6759 6.90867 10.1667 8.09566 10.1667 9.33333V46.6667C10.1667 47.9043 10.6759 49.0913 11.5823 49.9665C12.4887 50.8417 13.7181 51.3333 15 51.3333H44C45.2819 51.3333 46.5113 50.8417 47.4177 49.9665C48.3241 49.0913 48.8333 47.9043 48.8333 46.6667V21M31.9167 4.66667L48.8333 21M31.9167 4.66667V21H48.8333" 
                            stroke="#1E1E1E" 
                            strokeWidth="4" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p>RESUME-MAKER</p>
                </Link>
                <div className="nav-right">
                    <button 
                        className="preview-btn"
                        onClick={() => setShowPreview(true)}
                    >
                        Preview Resume
                    </button>
                    <div className="profile-menu">
                        <img 
                            src={user?.photo || '/default-avatar.png'} 
                            alt="Profile" 
                            className="profile-img"
                        />
                        <button 
                            className="nav-logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <div className="dashboard-content">
                <div className="sidebar">
                    <div className="section-toggles">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={visibleSections.personal}
                                onChange={() => toggleSection('personal')}
                            />
                            <span>Personal Details</span>
                        </label>
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={visibleSections.education}
                                onChange={() => toggleSection('education')}
                            />
                            <span>Education</span>
                        </label>
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={visibleSections.experience}
                                onChange={() => toggleSection('experience')}
                            />
                            <span>Experience</span>
                        </label>
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={visibleSections.projects}
                                onChange={() => toggleSection('projects')}
                            />
                            <span>Projects</span>
                        </label>
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={visibleSections.skills}
                                onChange={() => toggleSection('skills')}
                            />
                            <span>Skills</span>
                        </label>
                    </div>
                    <button 
                        className={`sidebar-btn ${activeSection === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveSection('personal')}
                    >
                        Personal Details
                    </button>
                    {visibleSections.education && (
                        <button 
                            className={`sidebar-btn ${activeSection === 'education' ? 'active' : ''}`}
                            onClick={() => setActiveSection('education')}
                        >
                            Education
                        </button>
                    )}
                    {visibleSections.experience && (
                        <button 
                            className={`sidebar-btn ${activeSection === 'experience' ? 'active' : ''}`}
                            onClick={() => setActiveSection('experience')}
                        >
                            Experience
                        </button>
                    )}
                    {visibleSections.projects && (
                        <button 
                            className={`sidebar-btn ${activeSection === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveSection('projects')}
                        >
                            Projects
                        </button>
                    )}
                    {visibleSections.skills && (
                        <button 
                            className={`sidebar-btn ${activeSection === 'skills' ? 'active' : ''}`}
                            onClick={() => setActiveSection('skills')}
                        >
                            Skills
                        </button>
                    )}
                </div>
                <div className="form-container">
                    {activeSection === 'personal' && (
                        <div className="form-section">
                            <h2>Personal Details</h2>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.personal.name}
                                onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.personal.email}
                                onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={formData.personal.phone}
                                onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={formData.personal.address}
                                onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
                            />
                            <input
                                type="url"
                                placeholder="LinkedIn URL"
                                value={formData.personal.linkedIn}
                                onChange={(e) => handleInputChange('personal', 'linkedIn', e.target.value)}
                            />
                            <input
                                type="url"
                                placeholder="GitHub URL"
                                value={formData.personal.github}
                                onChange={(e) => handleInputChange('personal', 'github', e.target.value)}
                            />
                        </div>
                    )}
                    {visibleSections.education && activeSection === 'education' && (
                        <div className="form-section">
                            <h2>Education</h2>
                            {formData.education.map((edu, index) => (
                                <div key={index} className="education-entry">
                                    <input
                                        type="text"
                                        placeholder="School Name"
                                        value={edu.school}
                                        onChange={(e) => handleInputChange('education', 'school', e.target.value, index)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Location (e.g., New York, NY)"
                                        value={edu.location}
                                        onChange={(e) => handleInputChange('education', 'location', e.target.value, index)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Degree (e.g., B.Sc. in Computer Science)"
                                        value={edu.degree}
                                        onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                                    />
                                    <div style={{ display: 'flex', gap: '0.5em' }}>
                                        <input
                                            type="month"
                                            placeholder="Start Date (YYYY-MM)"
                                            value={edu.startDate || ''}
                                            onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                                        />
                                        <input
                                            type="month"
                                            placeholder="End Date (YYYY-MM)"
                                            value={edu.endDate || ''}
                                            onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <button onClick={addEducation}>Add Education</button>
                        </div>
                    )}
                    {visibleSections.experience && activeSection === 'experience' && (
                        <div className="form-section">
                            <h2>Experience</h2>
                            {formData.experience.map((exp, index) => (
                                <div key={index} className="experience-entry">
                                    <input
                                        type="text"
                                        placeholder="Job Title (e.g., Software Engineer)"
                                        value={exp.title}
                                        onChange={(e) => handleInputChange('experience', 'title', e.target.value, index)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        value={exp.company}
                                        onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Location (e.g., San Francisco, CA)"
                                        value={exp.location}
                                        onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                                    />
                                    <div style={{ display: 'flex', gap: '0.5em' }}>
                                        <input
                                            type="month"
                                            placeholder="Start Date (YYYY-MM)"
                                            value={exp.startDate || ''}
                                            onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                                        />
                                        <input
                                            type="month"
                                            placeholder="End Date (YYYY-MM)"
                                            value={exp.endDate || ''}
                                            onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                                        />
                                    </div>
                                    <div className="bullet-points">
                                        {exp.points.map((point, pointIndex) => (
                                            <div key={pointIndex} className="bullet-input">
                                                <input
                                                    type="text"
                                                    placeholder={`Responsibility or Achievement #${pointIndex + 1}`}
                                                    value={point}
                                                    onChange={(e) => handleInputChange('experience', 'points', e.target.value, index, pointIndex)}
                                                />
                                                <button 
                                                    className="remove-bullet"
                                                    onClick={() => removeBulletPoint('experience', index, pointIndex)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        <button 
                                            className="add-bullet-btn"
                                            onClick={() => addBulletPoint('experience', index)}
                                        >
                                            + Add Bullet Point
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button className="add-btn" onClick={addExperience}>Add Experience</button>
                        </div>
                    )}
                    {visibleSections.projects && activeSection === 'projects' && (
                        <div className="form-section">
                            <h2>Projects</h2>
                            {formData.projects.map((proj, index) => (
                                <div key={index} className="project-entry">
                                    <div className="project-header">
                                        <input
                                            type="text"
                                            placeholder="Project Name"
                                            value={proj.name}
                                            onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
                                        />
                                        <div style={{ display: 'flex', gap: '0.5em' }}>
                                            <input
                                                type="month"
                                                placeholder="Start Date (YYYY-MM)"
                                                value={proj.startDate || ''}
                                                onChange={(e) => handleInputChange('projects', 'startDate', e.target.value, index)}
                                            />
                                            <input
                                                type="month"
                                                placeholder="End Date (YYYY-MM)"
                                                value={proj.endDate || ''}
                                                onChange={(e) => handleInputChange('projects', 'endDate', e.target.value, index)}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Technologies (e.g., Python, Flask, React, PostgreSQL, Docker)"
                                        value={proj.technologies}
                                        onChange={(e) => handleInputChange('projects', 'technologies', e.target.value, index)}
                                    />
                                    <textarea
                                        placeholder="Short Description (for AI bullet generation)"
                                        value={proj.description || ''}
                                        onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                                        style={{ width: '100%', minHeight: '40px', margin: '0.5em 0' }}
                                    />
                                    <button
                                        className="generate-ai-btn"
                                        style={{ marginBottom: '0.5em' }}
                                        onClick={() => handleAIBulletPoints(index)}
                                        disabled={!proj.name || !proj.technologies || !proj.description}
                                    >
                                        Generate AI Bullet Points
                                    </button>
                                    <div className="bullet-points">
                                        {proj.points.map((point, pointIndex) => (
                                            <div key={pointIndex} className="bullet-input">
                                                <input
                                                    type="text"
                                                    placeholder={`Project Detail #${pointIndex + 1}`}
                                                    value={point}
                                                    onChange={(e) => handleInputChange('projects', 'points', e.target.value, index, pointIndex)}
                                                />
                                                <button 
                                                    className="remove-bullet"
                                                    onClick={() => removeBulletPoint('projects', index, pointIndex)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        <button 
                                            className="add-bullet-btn"
                                            onClick={() => addBulletPoint('projects', index)}
                                        >
                                            + Add Bullet Point
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button className="add-btn" onClick={addProject}>Add Project</button>
                        </div>
                    )}
                    {activeSection === 'skills' && (
                        <div className="form-section">
                            <h2>Skills</h2>
                            <input
                                type="text"
                                placeholder="Languages"
                                value={formData.skills.languages}
                                onChange={(e) => handleInputChange('skills', 'languages', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Frameworks"
                                value={formData.skills.frameworks}
                                onChange={(e) => handleInputChange('skills', 'frameworks', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Developer Tools"
                                value={formData.skills.developer_tools}
                                onChange={(e) => handleInputChange('skills', 'developer_tools', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Libraries"
                                value={formData.skills.libraries}
                                onChange={(e) => handleInputChange('skills', 'libraries', e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showPreview && (
                <Preview 
                    formData={formData} 
                    visibleSections={visibleSections}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </div>
    );
}

export default Dashboard;