import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App(){
  return (
    <BrowserRouter>
      <div style={{fontFamily:'Arial', padding:16}}>
        <header style={{display:'flex', gap:12, alignItems:'center'}}>
          <h2>Smart Expense+</h2>
          <nav>
            <Link to="/">Dashboard</Link> {' | '}
            <Link to="/login">Login</Link> {' | '}
            <Link to="/register">Register</Link>
          </nav>
        </header>
        <main style={{marginTop:20}}>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
