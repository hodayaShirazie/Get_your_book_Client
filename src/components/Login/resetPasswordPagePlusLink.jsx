import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SERVER_URL } from '../../config';

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setMessage('No token provided.');
      setLoading(false);
      return;
    }
    axios.get(`${SERVER_URL}/validate-reset-token?token=${token}`)
      .then(res => {
        if (res.data.valid) {
          setTokenValid(true);
        } else {
          setMessage('Invalid or expired token.');
        }
      })
      .catch(() => setMessage('Error validating token.'))
      .finally(() => setLoading(false));
  }, [token]);

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
        token,
        password: newPassword
      });

      if (response.data.success) {
        setMessage('Your password has been reset successfully. Redirecting...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage(response.data.message || 'Password reset failed.');
      }
    } catch (err) {
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!tokenValid) return <p>{message}</p>;

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={handlePasswordReset}>
        <h2>Set a new password</h2>

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
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default ResetPasswordPage;
