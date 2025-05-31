
import { Link } from "react-router-dom";
import "./Login.css";
function Login() {
  const googleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/google/callback`, "_self");
  };



  return (
    <div className="auth-page">
      <nav className="nav">
        <Link to="/" className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="59"
            height="56"
            viewBox="0 0 59 56"
            fill="none"
          >
            <path
              d="M31.9167 4.66667H15C13.7181 4.66667 12.4887 5.15833 11.5823 6.0335C10.6759 6.90867 10.1667 8.09566 10.1667 9.33333V46.6667C10.1667 47.9043 10.6759 49.0913 11.5823 49.9665C12.4887 50.8417 13.7181 51.3333 15 51.3333H44C45.2819 51.3333 46.5113 50.8417 47.4177 49.9665C48.3241 49.0913 48.8333 47.9043 48.8333 46.6667V21M31.9167 4.66667L48.8333 21M31.9167 4.66667V21H48.8333"
              stroke="#1E1E1E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>RESUME-MAKER</p>
        </Link>
      </nav>

      <div className="login-container">
        <div className="login-card">
          <h2>Welcome to Resume Maker</h2>
          <p className="login-subtitle">
            Sign in to create your professional resume
          </p>

          <button onClick={() => googleLogin()} className="google-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
