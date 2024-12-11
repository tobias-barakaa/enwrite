import React from 'react';
import { Link } from 'react-router-dom';
import "./TokenExpired.css";


const TokenExpired: React.FC = () => {
  return (
    <div>
     <div className="error-container">
      <p className="token-expired">Token Expired</p>
      <p>Oops, it seems like your session has expired. Please log in again to continue.</p>
      <Link to="/login" className="btn">Log In Again</Link>
    </div>
    </div>
  )
}

export default TokenExpired
