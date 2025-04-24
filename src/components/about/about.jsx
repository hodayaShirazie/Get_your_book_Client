import React from 'react';
import './about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-sections">
        <div className="about-box">
          <h2 className="about-title">About Get Your Book</h2>
          <p className="about-text">
            Get Your Book is an innovative platform designed to make book purchasing and rental seamless and enjoyable. Whether you're a passionate reader or a casual browser, the system allows users to explore a diverse catalog, manage personal preferences, and stay updated with new releases – all in an accessible and user-friendly interface.
          </p>
        </div>
        <div className="about-box">
          <h2 className="about-title small">About Our Team</h2>
          <p className="about-text">
            We are Team 9 – a group of committed students with a shared passion for clean design and modern web development. Each team member brings their own strengths in UI/UX, backend development, and testing, ensuring our project is built with care and creativity. We believe in learning through building.
          </p>
        </div>
      </div>
      <footer className="about-footer">
        <hr className="about-divider" />
        <p>📚 Get Your Book | Built with 💚 by Team 9 | © 2025</p>
        <p className="footer-quote">"A room without books is like a body without a soul." – Cicero</p>
      </footer>
    </div>
  );
};

export default AboutPage;