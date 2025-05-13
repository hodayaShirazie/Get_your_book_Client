import { useState } from 'react';
import './PasswordRecovery.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SERVER_URL } from '../../config';


function PasswordRecovery() {
  const [username, setUsername] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();



  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.get(`${SERVER_URL}/security-question/${username}`);
      setSecurityQuestion(response.data.question);
      setStep(2);
    } catch (err) {
      setMessage('Username not found');
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post(`${SERVER_URL}/recover-password`, { username, securityAnswer });
      if (response.data.success) {
        setStep(3); 
      } else {
        setMessage('Incorrect answer. Please try again.');
      }
    } catch (err) {
      setMessage('Error verifying answer.');
    }
  };



  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage('');
  
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setMessage('Password must contain at least one special character.');
      return;
    }
  
    try {
      const response = await axios.post(`${SERVER_URL}/reset-password`, {
        username,
        password: newPassword
      });
  
      if (response.data.success) {
        setMessage('Your password has been reset successfully.');
        setStep(1);
        setUsername('');
        setNewPassword('');
        setConfirmPassword('');
        setSecurityAnswer('');
        setSecurityQuestion('');
        navigate('/customer-home'); 
      } else {
        setMessage(response.data.message || 'Password recovery failed.');
      }
    } catch (err) {
      if (err.response?.data?.message === "New password cannot be the same as the old password") {
        setMessage("Please choose a password different from your previous one.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };
  



  return (
    <div className="recovery-container">
      <form
        className="recovery-form"
        onSubmit={
          step === 1 ? handleUsernameSubmit :
          step === 2 ? handleAnswerSubmit :
          handlePasswordReset
        }
      >
        <h2>Password Recovery</h2>

        {step === 1 && (
          <>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
            <button type="submit" className="submit-button">Submit</button>
          </>
        )}

        {step === 2 && (
          <>
            <p>Please answer your security question.</p>
            <label>Security Question</label>
            <input type="text" value={securityQuestion} disabled />

            <label>Your Answer</label>
            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              placeholder="Enter your answer"
              required
            />
            <button type="submit" className="submit-button">Submit</button>
          </>
        )}

        {step === 3 && (
          <>
            <p><strong>Set a new password.</strong></p>
            <label>New Password</label>
<div className="password-input">
  <input
    type={showNewPassword ? 'text' : 'password'}
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    placeholder="Enter new password"
    required
  />
  <span onClick={() => setShowNewPassword(!showNewPassword)}>
    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

    <label>Confirm Password</label>
      <div className="password-input">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
        />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
      </div>

            <button type="submit" className="submit-button">Reset Password</button>
          </>
        )}

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default PasswordRecovery;
