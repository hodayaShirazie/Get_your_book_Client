import { useState } from 'react';
import './PasswordRecovery.css';
import axios from 'axios';
import { SERVER_URL } from '../../config';

function PasswordRecovery() {
  const [username, setUsername] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);

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
      console.log('recover-password response:', response.data);
  
      if (response.data.success) {
        try {
          const response2 = await axios.post(`${SERVER_URL}/forgot-password`, { username });
          console.log('forgot-password response:', response2.data);
  
          if (response2.data === "Password reset email sent successfully") {
            setMessage('Please check your email for password reset link.');
            setStep(3);
          } else {
            setMessage('Incorrect answer. Please try again.');
          }
        } catch (err) {
          console.error(err);
          setMessage('Error verifying answer.');
        }
      } else {
        setMessage('Incorrect answer. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error verifying answer.');
    }
  };
  
  
  

  return (
    <div className="recovery-container">
      <form
        className="recovery-form"
        onSubmit={step === 1 ? handleUsernameSubmit : handleAnswerSubmit}
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

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default PasswordRecovery;
