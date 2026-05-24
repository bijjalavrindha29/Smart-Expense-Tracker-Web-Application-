import React, { useState } from 'react';
import api, { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const res = await api.post('/api/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      nav('/');
    }catch(err){
      setError(err.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <div style={{maxWidth:420}}>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{color:'crimson'}}>{error}</p>}
      </form>
    </div>
  );
}
