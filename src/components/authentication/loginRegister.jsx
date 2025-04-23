import React, { useState } from 'react';
import axios from 'axios';

const SERVER_URL = 'https://get-your-book-server.onrender.com';
console.log('SERVER_URL:', SERVER_URL);


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
      const res = await axios.post(`${SERVER_URL}/users`, {
        username,
        password
      });
      // לקרוא את כל המשתמשים ולבדוק
      const usersRes = await axios.get(`${SERVER_URL}/users`);
      console.log('users in site', usersRes.data);
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
