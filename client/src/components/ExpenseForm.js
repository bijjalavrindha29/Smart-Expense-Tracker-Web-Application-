import React, { useState } from 'react';
import api from '../api';

export default function ExpenseForm({ onAdded }){
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');
  const [description, setDescription] = useState('');

  async function submit(e){
    e.preventDefault();
    try{
      const res = await api.post('/api/expenses', { amount: Number(amount), category, description });
      setAmount(''); setDescription('');
      onAdded && onAdded(res.data);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <form onSubmit={submit} style={{marginBottom:16}}>
      <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} required />
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option>Food</option>
        <option>Transport</option>
        <option>Rent</option>
        <option>Utilities</option>
        <option>Other</option>
      </select>
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
