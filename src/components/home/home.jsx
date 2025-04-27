import React from 'react';
import './home.css';

function Home() {
  return (
    <div className="background-container">
      <div className="overlay"></div>
      <h1 className="title">Get your book</h1>
      <div className="card">
        <button className="big-button">Registration</button>
        <button className="big-button">Login</button>
      </div>
    </div>
  );
}

export default Home;