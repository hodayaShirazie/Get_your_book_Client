// import React from 'react';
// import './about.css';

// const AboutPage = () => {
//   return (
//     <div className="about-page">
//       <section className="about-section">
//         <div className="about-text">
//           <div className="about-box project">
//             <h1>ABOUT OUR PROJECT</h1>
//             <p>
            //   Get Your Book is an innovative platform designed to make book purchasing and rental seamless and enjoyable.
            //   The project is focused on improving accessibility and efficiency in how people interact with books.
            // </p>
//           </div>
//           <div className="about-box team">
//             <h2>ABOUT OUR TEAM</h2>
            // <p>
            //   We are Team 9 – a group of enthusiastic students committed to clean UI/UX, efficient backend logic, and full-stack functionality.
            //   Each of us contributes a unique strength to this meaningful educational project.
            // </p>
//           </div>
//         </div>
//         <div>
//           <img
//             src="https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg"
//             alt="Team Illustration"
//             className="about-image"
//           />
//         </div>
//       </section>

//       <footer className="about-footer">
//         <hr />
//         <p>📚 Get Your Book | Built with 💚 by Team 9 | © 2025</p>
//         <p className="quote">
//           "A room without books is like a body without a soul." – Cicero
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default AboutPage;



import React, { useState, useEffect } from 'react';
import './about.css';


const SERVER_URL = 'https://get-your-book-server.onrender.com';
// const SERVER_URL = 'http://localhost:3000'; // Local development URL
console.log('SERVER_URL:', SERVER_URL);


const AboutPage = () => {
  const [projectText, setProjectText] = useState('');
  const [teamText, setTeamText] = useState('');

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
