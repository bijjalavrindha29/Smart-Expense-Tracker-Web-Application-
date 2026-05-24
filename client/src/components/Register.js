import React, { useState } from 'react';
import api, { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const res = await api.post('/api/auth/register', { name, email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      nav('/');
    }catch(err){
      setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.msg || 'Register failed');
    }
  }

  return (
    <div style={{maxWidth:480}}>
      <h3>Register</h3>
      <form onSubmit={submit}>
        <div>
          <label>Name</label><br/>
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button type="submit">Create account</button>
        {error && <p style={{color:'crimson'}}>{error}</p>}
      </form>
    </div>
  );
}
