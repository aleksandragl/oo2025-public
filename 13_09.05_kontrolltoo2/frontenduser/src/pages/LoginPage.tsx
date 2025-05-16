import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text();

    if (response.ok) {
      setMessage(text); // "Sisselogimine õnnestus"
    } else {
      setMessage(text); 
    }
  };

  return (
    <div>
      <h2>Logi sisse</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>E-mail:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Parool:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Logi sisse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
