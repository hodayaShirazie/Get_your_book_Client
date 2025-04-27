import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const SERVER_URL = 'https://get-your-book-server.onrender.com';
  const SERVER_URL = 'http://localhost:3000'; 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    try {
      const response = await axios.post(`${SERVER_URL}/login`, form);

      if (response.data.success) {
        setForm({ username: '', password: '' });

        if (response.data.role === 'admin') {
        navigate('/admin-home');
      } else {
        navigate('/customer-home');
        }
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/recover-password');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="login-button">Login</button>

        <p className="forgot-link" onClick={handleForgotPassword}>Forgot Password?</p>
      </form>
    </div>
  );
}

export default Login;