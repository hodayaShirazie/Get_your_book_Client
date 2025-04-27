import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './home.css';

function Home() {
  const navigate = useNavigate(); 

  return (
    <div className="background-container">
      <div className="overlay"></div>
      <h1 className="title">Get your book</h1>
      <div className="card">
        <button className="big-button" onClick={() => navigate('/register')}>
          Registration
        </button>
        <button className="big-button" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
