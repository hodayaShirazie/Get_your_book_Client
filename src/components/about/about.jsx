import React, { useState, useEffect } from 'react';
import './about.css';
import { useNavigate } from 'react-router-dom';

import { SERVER_URL } from '../../config'; 


// const SERVER_URL = 'https://get-your-book-server.onrender.com';
// const SERVER_URL = 'http://localhost:3000'; // Local development URL
console.log('SERVER_URL:', SERVER_URL);


const AboutPage = () => {
  const [projectText, setProjectText] = useState('');
  const [teamText, setTeamText] = useState('');
  const navigate = useNavigate();

  const handleReturnHome = () => {
    const role = localStorage.getItem('role');
    if (role && role.toLowerCase() === 'admin') {
      navigate('/admin-home');
    } else {
      navigate('/customer-home');
    }
  };
  
  
  

  useEffect(() => {
    fetch(`${SERVER_URL}/about`)
      .then((response) => response.json())
      .then((data) => {
        setProjectText(data.about_project);
        setTeamText(data.about_team);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const formatText = (text) => {
    return text.split('\n').map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };

  return (
    <div className="about-page">
      <div className="home-button-container">
      <button className="home-button" onClick={handleReturnHome}>
      Return to Home
    </button>
    </div>
      <section className="about-section">
        <div className="about-text">
          <div className="about-box project">
            <h1>What is Get Your Book?</h1>
            <p>{projectText ? formatText(projectText) : 'Loading project description...'}</p>
          </div>
          <div className="about-box team">
            <h2>Who Are We?</h2>
            <p>{teamText || 'Loading team description...'}</p>
          </div>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg"
            alt="Team Illustration"
            className="about-image"
          />
        </div>
      </section>

      <footer className="about-footer">
        <hr />
        <p>📚 Get Your Book | Built with 💚 by Team 9 | © 2025</p>
        <p className="quote">
          "A room without books is like a body without a soul." – Cicero
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
