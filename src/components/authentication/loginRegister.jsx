import React, { useState } from 'react';
import './loginRegister.css'; // make sure you create this file

const SERVER_URL = 'https://get-your-book-server.onrender.com';

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setFormData({ fullName: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? `${SERVER_URL}/api/login`
      : `${SERVER_URL}/api/register`;

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || (isLogin ? 'Logged in!' : 'Registered!'));
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p className="message">{message}</p>
      <p>
        {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
        <button className="toggle-btn" onClick={toggleForm}>
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
}
