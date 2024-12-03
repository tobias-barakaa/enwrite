import React from "react";
import { Link } from "react-router-dom";
import "./AuthLinks.css"; 

const AuthLinks: React.FC = () => {
  return (
    <p className="auth-links">
      <span>
        Are you new? <Link to="/get-started">Sign UP</Link>
      </span>
      <span>
        <Link to="/forgot-password">Forgot Password</Link>
      </span>
    </p>
  );
};

export default AuthLinks;
