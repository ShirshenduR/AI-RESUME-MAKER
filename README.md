# 📄 Resume-Maker

A full-stack web application that allows students to easily create **professional, ATS-friendly resumes**. Users can input their personal and professional details, preview a live resume, generate AI-enhanced project descriptions, and download the final result as a PDF.

---

## 🚀 Features

* ✅ User Authentication (Signup/Login)
* 📝 Resume Form (Input personal, academic, and professional details)
* 🔍 Live Resume Preview
* 📄 PDF Generation
* 🤖 **AI-Powered Project Enhancer** (Generate ATS-optimized descriptions from project title & summary)

---

## 🧠 AI-Powered Resume Enhancer

Just enter your **project title** and a short description — our AI engine will:

* Create **clear, concise bullet points**
* Highlight **impact, technologies, and achievements**
* Ensure content is **ATS (Applicant Tracking System) optimized**

Preview it instantly, tweak if needed, and download your resume with this polished content!

---

## 💠 Tech Stack

| Section            | Tech Used                               |
| ------------------ | --------------------------------------- |
| **Frontend**       | React.js, HTML, CSS                     |
| **Backend**        | Node.js, Express.js                     |
| **Database**       | MongoDB, Mongoose                       |
| **Authentication** | JWT, bcrypt.js                          |
| **PDF Generation** | Puppeteer / html2pdf.js                 |
| **AI Integration** | OpenAI API / Mistral / Custom Prompting |

---

## 📦 Installation & Setup

### 🔧 Prerequisites

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [OpenAI API Key](https://platform.openai.com/) (or your selected model)

### 🖥 Backend Setup

```bash
git clone https://github.com/your-username/resume-maker.git
cd resume-maker
npm install
```

Create a `.env` file in the root with the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_or_mistral_key
```

Start the backend server:

```bash
npm start
```

### 💼 Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🔗 API Routes

### 🔐 Authentication

* `POST /api/auth/signup` – Register a new user
* `POST /api/auth/login` – Login user

### 📄 Resume

* `POST /api/resume` – Save resume details
* `GET /api/resume/:id` – Fetch resume
* `GET /api/resume/pdf/:id` – Generate & download resume PDF

### 🤖 AI Resume Enhancement

* `POST /api/ai/generate-project` – Generate ATS-optimized description from title & summary

---

## 🚀 Deployment

| Component    | Recommended Platform |
| ------------ | -------------------- |
| **Backend**  | Heroku / Render      |
| **Frontend** | Vercel / Netlify     |
| **Database** | MongoDB Atlas        |

---

## 📸 Screenshots

> Yet to be uploaded.....

---

## 🙌 Contributors

* [Shirshendu R](https://github.com/ShirshenduR)

---

## 📬 Feedback & Contributions

Found a bug or have a suggestion? Open an issue or pull request. Let's build something impactful for students, together!

## License
This project is open-source and available under the MIT License.

