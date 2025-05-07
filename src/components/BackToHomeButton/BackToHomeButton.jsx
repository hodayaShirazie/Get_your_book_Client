import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackToHomeButton.css';

export default function BackToHomeButton() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    const role = localStorage.getItem('role');
    if (role && role.toLowerCase() === 'admin') {
      navigate('/admin-home');
    } else {
      navigate('/customer-home');
    }
  };
  

  return (
    <div className="home-button-container">
      <button className="home-button" onClick={handleReturnHome}>
        Return to Home
      </button>
    </div>
  );
}
