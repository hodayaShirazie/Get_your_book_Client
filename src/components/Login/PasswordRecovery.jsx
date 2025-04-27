import { useState } from 'react';
import './PasswordRecovery.css';
import axios from 'axios';

function PasswordRecovery() {
  const [username, setUsername] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); 

  const SERVER_URL = 'https://get-your-book-server.onrender.com';
//   const SERVER_URL = 'http://localhost:3000'; 

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
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
    try {
      const response = await axios.post(`${SERVER_URL}/recover-password`, { username, securityAnswer });
      if (response.data.success) {
        setMessage('Your password is: ' + response.data.password);
      } else {
        setMessage('Incorrect answer. Please try again.');
      }
    } catch (err) {
      setMessage('Error recovering password.');
    }
  };

  return (
    <div className="recovery-container">
      <form className="recovery-form" onSubmit={step === 1 ? handleUsernameSubmit : handleAnswerSubmit}>
        <h2>Password Recovery</h2>
        {step === 1 ? (
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
        ) : (
          <>
            <p>Please enter your username and answer the security question you selected during registration.</p>
            <label>Security Question</label>
            <input
              type="text"
              value={securityQuestion}
              disabled
            />

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
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default PasswordRecovery;