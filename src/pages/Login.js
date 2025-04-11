
import React, { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../Config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl + '/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login ok!');
      window.location.href = '/';
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
