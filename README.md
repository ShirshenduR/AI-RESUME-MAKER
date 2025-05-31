# AI Resume Maker

A sleek, LaTeX-inspired resume builder with live preview, secure Google OAuth, and AI-powered bullet point generation for professional and ATS-friendly resumes.

---

## 🚀 Features

* **🔐 Google OAuth Authentication**
  Secure sign-in/sign-out with Google, including user profile and image support.

* **📋 Resume Builder Dashboard**
  Intuitive dashboard for entering and managing resume sections:

  * Personal Details (Name, Email, Phone, LinkedIn, GitHub, Address)
  * Education (Multiple entries with start/end dates)
  * Experience (Multiple entries, bullet points, date range)
  * Projects (Multiple entries with optional AI-generated bullets)
  * Skills (Languages, frameworks, tools, libraries)

* **🧩 Section Visibility Control**
  Sidebar toggles to include/exclude sections in preview and PDF.

* **👀 Live LaTeX-Style Preview**
  Real-time preview that reflects the professional format of a LaTeX resume.

* **📄 PDF Export**
  One-click PDF generation from LaTeX with section toggles respected.

* **🤖 AI Bullet Generator**
  Generate concise, impactful project bullet points with Gemini API integration.

* **📱 Fully Responsive**
  Works smoothly on both desktop and mobile devices.

---

## 🏗️ Project Structure

```
AI-RESUME-MAKER/
  backend/           # Node.js/Express (API, OAuth, PDF, AI services)
  frontend/          # React (Vite-based UI with preview and forms)
```

---

## 🛠️ Setup Instructions

### Prerequisites

* Node.js (v18 or newer)
* npm or yarn
* BasicTeX (macOS) or full LaTeX distribution (Windows/Linux)
* LaTeX packages: `enumitem`, `times`, `hyperref`, `xcolor`, `geometry`

### 1. Clone the Repository

```bash
git clone <repo-url>
cd AI-RESUME-MAKER
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file with the following:

```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
SESSION_SECRET=your-session-secret
FRONTEND_URL=http://localhost:5173
AI_API_KEY=your-gemini-api-key
```

Run the backend:

```bash
npm start
```

Backend will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

---

## 🧠 How It Works

1. **Login with Google** to access your personalized dashboard.
2. **Fill Out Resume Sections** using dynamic forms.
3. **Use Section Toggles** to customize what's shown.
4. **Preview in Real-Time** with LaTeX-style rendering.
5. **Generate AI Bullet Points** for projects with one click.
6. **Export as PDF** with perfect formatting.

---

## 🧩 Customization & Extensibility

* **AI Provider**: Switch or upgrade AI model using your preferred provider (e.g., OpenAI, Gemini).
* **Styling**: Customize components or add themes by editing CSS files.
* **PDF Template**: Replace the base `.tex` template to personalize layout, fonts, or sections.

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 🙌 Credits

* **LaTeX Template Inspiration**: [sb2nov/resume](https://github.com/sb2nov/resume)
* **UI/UX Concept**: Inspired by Jake Gutierrez's modern resume format

---

For feedback or contributions, feel free to [open an issue](#) or submit a pull request!
