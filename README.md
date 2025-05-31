# AI Resume Maker

A modern, LaTeX-inspired resume builder with live preview, Google OAuth, and AI-powered bullet point generation.

---

## Features

- **Google OAuth Login/Logout**: Secure authentication with Google, including profile image and logout from the app.
- **Dashboard**: Clean, robust UI for entering all resume sections:
  - Personal Details
  - Education (multiple entries, start/end dates)
  - Experience (multiple entries, bullet points, start/end dates)
  - Projects (multiple entries, bullet points, start/end dates, AI bullet generation)
  - Skills (languages, frameworks, tools, libraries)
- **Section Toggles**: Sidebar checkboxes to show/hide resume sections in preview and final PDF.
- **Live LaTeX-Style Preview**: Real-time preview matching a professional LaTeX resume template, with correct fonts, spacing, and alignment.
- **PDF Generation**: One-click PDF export (backend integration required).
- **AI Bullet Point Generation**: (Pluggable) Generate project bullet points using AI based on project name and description.
- **Responsive Design**: Works on desktop and mobile.

---

## Project Structure

```
AI-RESUME-MAKER/
  backend/           # Node.js/Express backend (API, OAuth, PDF, AI endpoints)
  frontend/          # React frontend (Vite, main app UI)
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone the Repository
```sh
git clone <repo-url>
cd AI-RESUME-MAKER
```

### 2. Backend Setup
```sh
cd backend
npm install
# Create a .env file with your Google OAuth credentials and other secrets
# Example .env:
# GOOGLE_CLIENT_ID=your-client-id
# GOOGLE_CLIENT_SECRET=your-client-secret
# SESSION_SECRET=your-session-secret
# FRONTEND_URL=http://localhost:5173
# (Optional) AI_API_KEY=your-openai-or-other-key
npm start
```
- The backend runs on `http://localhost:5000` by default.

### 3. Frontend Setup
```sh
cd ../frontend
npm install
# Create a .env file with:
# VITE_API_URL=http://localhost:5000
npm run dev
```
- The frontend runs on `http://localhost:5173` by default.

---

## AI Resume Maker: How It Works

- **Login**: Sign in with Google to access your dashboard.
- **Enter Resume Data**: Fill out each section. Add/remove entries as needed.
- **Section Toggles**: Use sidebar checkboxes to control which sections appear in your resume.
- **Live Preview**: Click "Preview Resume" to see your resume in a LaTeX-style format.
- **AI Bullet Points**: In the Projects section, enter a project name and description, then click "Generate AI Bullet Points" to auto-generate bullet points (requires backend AI integration).
- **Export PDF**: Click "Generate PDF" in the preview to download your resume (requires backend PDF integration).

---

## Customization & Extensibility
- **AI Integration**: Connect your preferred AI API (e.g., OpenAI) in the backend for bullet point generation.
- **PDF Generation**: Implement PDF export in the backend (e.g., using Puppeteer or pdfkit).
- **Styling**: Tweak `Preview.css` and `Dashboard.css` for further LaTeX-style or branding customizations.

---

## License
MIT

---

## Credits
- LaTeX resume template inspiration: [sb2nov/resume](https://github.com/sb2nov/resume)
- Author: Jake Gutierrez (template inspiration)

---

For questions or contributions, please open an issue or pull request.

