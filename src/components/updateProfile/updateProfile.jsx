import { useState, useEffect } from 'react';
import './updateProfile.css';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SERVER_URL } from '../../config'; 
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';


function UpdateProfile() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [currentUser, setCurrentUser] = useState({ username: '', password: '' });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const role = localStorage.getItem('role');
        const username = localStorage.getItem('username');

        const response = await axios.get(`${SERVER_URL}/get-user-profile/${username}/${role}`);

        if (response.data.success) {
          const user = response.data.user;
          setCurrentUser(user);
          setForm({ username: user.username, password: user.password });
        }
      } catch (err) {
        setErrorMsg('Error fetching user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg('');
    setSuccessMsg('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const role = localStorage.getItem('role');
    const password = form.password;
  
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }
  
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setErrorMsg('Password must contain at least one special character');
      return;
    }
  
    if (role === 'admin' && !/\d/.test(password)) {
      setErrorMsg('Manager password must contain at least one number');
      return;
    }
    if (role === 'admin' && form.username.length < 8) {
      setErrorMsg('Username must be at least 8 characters long');
      return;
    }
  
    try {
      const currentUsername = localStorage.getItem('username');
      const response = await axios.post(`${SERVER_URL}/update-profile`, {
        currentUsername,
        newUsername: form.username,
        newPassword: password,
        role
      });
  
      if (response.data.success) {
        setSuccessMsg('Details updated successfully.');
        setForm({ username: '', password: '' });
        localStorage.setItem('username', form.username);
      } else {
        setErrorMsg(response.data.message || 'Failed to update details.');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('Server error or invalid input.');
      }
    }
  };


  return (
    <div className="update-container">
      <form className="update-form" onSubmit={handleSubmit}>
        <h2>Update Profile</h2>

        {successMsg && <p className="success-message">{successMsg}</p>}
        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <label>New Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder={currentUser.username || 'Enter new username'}
          required
        />

        <label>New Password</label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password || currentUser.password}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />
          <span className="eye-icon" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="update-button">Update</button>
      </form>
      <BackToHomeButton />
    </div>
  );
}

export default UpdateProfile;
