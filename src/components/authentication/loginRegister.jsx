// components/LoginRegister.jsx

import React, { useState } from 'react';
import './loginRegister.css';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="form-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      <form className="auth-form">
        {!isLogin && (
          <input type="text" placeholder="Full Name" required />
        )}
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <p className="toggle-text">
        {isLogin
          ? "Don't have an account?"
          : 'Already have an account?'}
        <button onClick={toggleForm} className="toggle-button">
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
};

export default LoginRegister;
