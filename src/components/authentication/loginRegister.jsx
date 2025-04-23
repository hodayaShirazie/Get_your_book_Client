// import React, { useState } from 'react';
// import './loginRegister.css';

// const SERVER_URL =
//   import.meta.env.MODE === 'development'
//     ? 'http://localhost:3000'
//     : 'https://get-your-book-server.onrender.com';

// export default function LoginRegister() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [message, setMessage] = useState('');

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setMessage('');
//     setFormData({ username: '', password: '' });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = isLogin
//       ? `${SERVER_URL}/login`
//       : `${SERVER_URL}/register`;

//     const payload = {
//       username: formData.username,
//       password: formData.password
//     };

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message || (isLogin ? 'Logged in!' : 'Registered!'));
//       } else {
//         setMessage(data.error || 'Something went wrong');
//       }
//     } catch (err) {
//       setMessage('Server error');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isLogin ? 'Login' : 'Register'}</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
//       </form>
//       <p className="message">{message}</p>
//       <p>
//         {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//         <button className="toggle-btn" onClick={toggleForm}>
//           {isLogin ? 'Register here' : 'Login here'}
//         </button>
//       </p>
//     </div>
//   );
// }





import React, { useState } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.VITE_SERVER_URL;

// const SERVER_URL = import.meta.env.MODE === 'development'
//   ? import.meta.env.VITE_SERVER_URL
  // : import.meta.env.VITE_SERVER_URL_PROD;
// 
  // console.log('Server URL:', SERVER_URL);

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${SERVER_URL}`, {
        username,
        password
      });
      alert('✅ משתמש נוצר בהצלחה!');
    } catch (err) {
      console.error('❌ שגיאה ביצירת המשתמש:', err);
      alert('🚫 יצירת המשתמש נכשלה!');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          שם משתמש:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          סיסמה:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">הירשם</button>
      </form>
    </div>
    
  );
}
