// import { useState, useEffect } from 'react';
// import './Register.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import  {SERVER_URL}  from '../../config'; 


// function Register() {
//   const [form, setForm] = useState({
//     username: '',
//     password: '',
//     confirmPassword: '',
//     securityQuestionId: '',
//     securityAnswer: '',
//   });
//   const [securityQuestions, setSecurityQuestions] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);


//   useEffect(() => {
//     axios.get(`${SERVER_URL}/security-questions`)
//       .then(response => setSecurityQuestions(response.data))
//       .catch(err => console.error('Failed loading security questions', err));
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError('');
//     setSuccess('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     if (form.password.length < 8) {
//       setError('Password must be at least 8 characters long');
//       return;
//     }
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
//       setError('Password must contain at least one special character');
//       return;
//     }

//     try {
//       const response = await axios.post(`${SERVER_URL}/register`, form);
//       if (response.data.success) {
//         localStorage.setItem('username', form.username);
//         localStorage.setItem('role', 'customer');
//         setSuccess('Registration successful! You can log in and start shopping.');
//         setForm({
//           username: '',
//           password: '',
//           confirmPassword: '',
//           securityQuestionId: '',
//           securityAnswer: '',
//         });
//         navigate('/customer-home');  
//       } else {
//         setError(response.data.message || 'Registration failed');
//       }
//     } catch (err) {
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError('Server error');
//       }
//     }
//   };

//   return (
//     <div className="register-container">
//       <form className="register-form" onSubmit={handleSubmit}>
//         <h2>Register</h2>
  
//         <label>Username <span className="required"></span></label>
//         <input
//           type="text"
//           name="username"
//           value={form.username}
//           onChange={handleChange}
//           placeholder="Enter your username"
//           required
//         />
//         {error.includes('username') && <p className="error-message">{error}</p>}
  
//         <label>Password <span className="required"></span></label>
//         <div className="password-input-container">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Create a password"
//             required
//           />
//           <span className="eye-icon" onClick={() => setShowPassword(prev => !prev)}>
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>
  
//         <label>Confirm Password <span className="required"></span></label>
//         <div className="password-input-container">
//           <input
//             type={showConfirmPassword ? 'text' : 'password'}
//             name="confirmPassword"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm your password"
//             required
//           />
//           <span className="eye-icon" onClick={() => setShowConfirmPassword(prev => !prev)}>
//             {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>
//         {error === 'Passwords do not match' && <p className="error-message">{error}</p>}
  
//         <label>Security Question <span className="required"></span></label>
//         <select
//           name="securityQuestionId"
//           value={form.securityQuestionId}
//           onChange={handleChange}
//           required
//         >
//           <option value="">-- Select a question --</option>
//           {securityQuestions.map((q) => (
//             <option key={q.id} value={q.id}>{q.question}</option>
//           ))}
//         </select>
  
//         <label>Security Answer <span className="required"></span></label>
//         <input
//           type="text"
//           name="securityAnswer"
//           value={form.securityAnswer}
//           onChange={handleChange}
//           placeholder="Enter your answer"
//           required
//         />
  
//         <div className="form-errors">
//           {error && !error.includes('username') && <p className="error-message">{error}</p>}
//           {success && <p className="success-message">{success}</p>}
//         </div>
  
//         <button type="submit" className="register-button">Register</button>
//       </form>
//     </div>
//   );
  
// }

// export default Register;









import { useState, useEffect } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SERVER_URL } from '../../config';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestionId: '',
    securityAnswer: '',
  });

  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    axios.get(`${SERVER_URL}/security-questions`)
      .then(response => setSecurityQuestions(response.data))
      .catch(err => console.error('Failed loading security questions', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
      setError('Password must contain at least one special character');
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/register`, form);
      if (response.data.success) {
        localStorage.setItem('username', form.username);
        localStorage.setItem('role', 'customer');
        setSuccess('Registration successful! You can log in and start shopping.');
        setForm({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          securityQuestionId: '',
          securityAnswer: '',
        });
        navigate('/customer-home');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Server error');
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <label>Username <span className="required"></span></label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        {error.includes('username') && <p className="error-message">{error}</p>}

        <label>Email <span className="required"></span></label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        {error.includes('email') && <p className="error-message">{error}</p>}


        <label>Password <span className="required"></span></label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
          <span className="eye-icon" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label>Confirm Password <span className="required"></span></label>
        <div className="password-input-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
          <span className="eye-icon" onClick={() => setShowConfirmPassword(prev => !prev)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {error === 'Passwords do not match' && <p className="error-message">{error}</p>}

        <label>Security Question <span className="required"></span></label>
        <select
          name="securityQuestionId"
          value={form.securityQuestionId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select a question --</option>
          {securityQuestions.map((q) => (
            <option key={q.id} value={q.id}>{q.question}</option>
          ))}
        </select>

        <label>Security Answer <span className="required"></span></label>
        <input
          type="text"
          name="securityAnswer"
          value={form.securityAnswer}
          onChange={handleChange}
          placeholder="Enter your answer"
          required
        />

        <div className="form-errors">
          {error && !error.includes('username') && !error.includes('email') && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
