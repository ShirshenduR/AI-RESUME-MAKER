import { Link } from "react-router-dom";
import "./PageNotFound.css";
function PageNotFound() {
  return (
    <div className="page-not-found">
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

      <div className="not-found-container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="home-link">Go to Home</Link>
      </div>
    </div>
  );
}
export default PageNotFound;