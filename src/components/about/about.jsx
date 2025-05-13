import React, { useState, useEffect } from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';

import { SERVER_URL } from '../../config'; 

console.log('SERVER_URL:', SERVER_URL);


const AboutPage = () => {
  const [projectText, setProjectText] = useState('');
  const [teamText, setTeamText] = useState('');
  const navigate = useNavigate();

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
      <BackToHomeButton />
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
