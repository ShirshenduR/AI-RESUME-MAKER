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

**Google OAuth Setup:**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing one
- Enable Google+ API
- Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
- Set authorized redirect URIs to: `http://localhost:5000/auth/google/callback`
- Copy Client ID and Client Secret to your `.env` file

**Gemini AI Setup:**
- Go to [Google AI Studio](https://aistudio.google.com/)
- Get your API key
- Add it to your `.env` file

**Firebase Authentication Setup:**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project or select existing one
- Enable Authentication and configure sign-in methods (Email/Password, Google)
- Get your Firebase config from Project Settings
- Add Firebase config to your `.env` file

**Example .env configuration:**
```env
GOOGLE_CLIENT_ID=804574429648-example.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-exampleSecretKey
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

### 4. Verify Setup

1. Open `http://localhost:5173` in your browser
2. Click "Sign In" and test Google OAuth
3. Try creating a resume and generating a PDF

---

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Deploy your backend to your preferred service
2. Set environment variables in your deployment platform
3. Update `CLIENT_URL` to your frontend deployment URL
4. Update `SERVER_URL` to your backend deployment URL

### Frontend Deployment (Vercel/Netlify)

1. Update `frontend/.env` with your deployed backend URL:
   ```env
   VITE_API_URL=https://your-backend-domain.com
   ```
2. Deploy to Vercel/Netlify

### Important Notes for Deployment

- **Google OAuth**: Update authorized redirect URIs in Google Cloud Console to include your production URLs
- **CORS**: The backend is configured to allow requests from `CLIENT_URL`
- **PDF Generation**: Ensure your deployment platform supports LaTeX (some platforms may require additional setup)

---

## 🔧 Troubleshooting

### Common Issues

1. **404 after login redirect**: 
   - Ensure your backend is deployed and `VITE_API_URL` points to the correct URL
   - Check that Google OAuth redirect URLs are correctly configured

2. **PDF generation fails**:
   - Verify pdflatex is installed and accessible
   - Check server logs for LaTeX compilation errors

3. **AI bullet points not working**:
   - Verify your Gemini API key is valid and has sufficient quota
   - Check network connectivity to Google AI services

4. **CORS errors**:
   - Ensure `CLIENT_URL` in backend `.env` matches your frontend URL
   - Verify credentials are included in requests

### Development Tips

- Use browser developer tools to check network requests
- Check backend console logs for detailed error messages
- Ensure all environment variables are properly set

---

## 📝 Features

- **Google OAuth Authentication**
- **AI-Powered Bullet Point Generation** (using Gemini AI)
- **Live Resume Preview**
- **Professional PDF Export** (LaTeX-based)
- **Responsive Design**
- **Section Toggle Functionality**

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
