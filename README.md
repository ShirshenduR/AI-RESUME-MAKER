# AI Resume Maker

A sleek, LaTeX-inspired resume builder with live preview, secure Firebase authentication, and AI-powered bullet point generation for professional and ATS-friendly resumes.

---

## 🚀 Features

* **🔐 Firebase Authentication**
  Secure sign-in with Google OAuth, including user profile and image support.

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
  backend/           # Node.js/Express (API, PDF, AI services)
  frontend/          # React (Vite-based UI with Firebase auth, preview and forms)
```

---

## 🛠️ Setup Instructions

### Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **pdflatex** (for PDF generation)
  - **Windows**: Install MiKTeX or TeX Live
  - **macOS**: Install MacTeX (`brew install --cask mactex`)
  - **Linux**: Install texlive-full (`sudo apt-get install texlive-full`)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AI-RESUME-MAKER
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in the required values:

**Gemini AI Setup:**
- Go to [Google AI Studio](https://aistudio.google.com/)
- Get your API key
- Add it to your `.env` file

**Example .env configuration:**
```env
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
PORT=5000
GEMINI_API_KEY=AIzaSyExample_API_Key
NODE_ENV=development
```

#### Start Backend Server

```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with Firebase configuration:

**Firebase Authentication Setup:**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project or select existing one
- Enable Authentication and configure Google sign-in method
- Go to Project Settings → General → Your apps → Web app
- Copy the Firebase configuration values

   ```env
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

#### Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Firebase Setup Instructions

#### Step-by-step Firebase Configuration:

1. **Create Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project" or "Add project"
   - Enter project name (e.g., "resume-maker-app")
   - Complete project creation

2. **Enable Authentication:**
   - In Firebase project dashboard, click "Authentication"
   - Click "Get started"
   - Go to "Sign-in method" tab
   - Enable Google sign-in provider
   - Add your support email and project name
   - Click "Save"

3. **Configure Authorized Domains:**
   - In Authentication → Sign-in method → Authorized domains
   - Add `localhost` (for development)
   - Add your production domain (when deploying)

4. **Get Firebase Configuration:**
   - Click gear icon ⚙️ → Project settings
   - Scroll to "Your apps" → Click Web icon `</>`
   - Register app with nickname "Resume Maker Web"
   - Copy the configuration values to your `.env` file

### 5. Verify Setup

1. Open `http://localhost:5173` in your browser
2. Click "Continue with Google" to test Firebase authentication
3. Try creating a resume and generating a PDF

---

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Deploy your backend to your preferred service
2. Set environment variables in your deployment platform:
   - `CLIENT_URL` (your frontend deployment URL)
   - `GEMINI_API_KEY`
   - `NODE_ENV=production`

### Frontend Deployment (Vercel/Netlify)

1. Update `frontend/.env` with your deployed backend URL:
   ```env
   VITE_API_URL=https://your-backend-domain.com
   ```
2. Add all Firebase environment variables to your deployment platform
3. Deploy to Vercel/Netlify

### Important Notes for Deployment

- **Firebase Authentication**: Update authorized domains in Firebase Console to include your production URLs
- **CORS**: The backend is configured to allow requests from `CLIENT_URL`
- **PDF Generation**: Ensure your deployment platform supports LaTeX (some platforms may require additional setup)

---

## 🔧 Troubleshooting

### Common Issues

1. **Authentication not working**: 
   - Verify Firebase configuration values are correct
   - Check that your domain is added to Firebase authorized domains
   - Ensure Firebase project has Google sign-in enabled

2. **PDF generation fails**:
   - Verify pdflatex is installed and accessible
   - Check server logs for LaTeX compilation errors

3. **AI bullet points not working**:
   - Verify your Gemini API key is valid and has sufficient quota
   - Check network connectivity to Google AI services

4. **CORS errors**:
   - Ensure `CLIENT_URL` in backend `.env` matches your frontend URL

### Development Tips

- Use browser developer tools to check network requests
- Check backend console logs for detailed error messages
- Ensure all environment variables are properly set
- Test Firebase authentication in incognito mode to verify functionality

---

## 📝 Key Technologies

- **Frontend**: React, Vite, Firebase Authentication
- **Backend**: Node.js, Express
- **Authentication**: Firebase (Google OAuth)
- **AI**: Google Gemini API for bullet point generation
- **PDF Generation**: LaTeX with node-latex
- **Styling**: CSS with responsive design

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (including authentication flow)
5. Submit a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
