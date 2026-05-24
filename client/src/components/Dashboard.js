import React, { useEffect, useState } from 'react';
import api from '../api';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard(){
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.get('/api/expenses').then(r=> setItems(r.data)).catch(()=>{});
  }, []);

  function handleAdded(exp){ setItems(prev => [exp, ...prev]); }
  function handleRemoved(id){ setItems(prev => prev.filter(p=>p._id !== id)); }

  const totals = items.reduce((acc,i)=>{ acc[i.category] = (acc[i.category]||0)+i.amount; return acc; }, {});
  const chartData = {
    labels: Object.keys(totals),
    datasets: [{ label: 'Spending by category', data: Object.values(totals), backgroundColor: 'rgba(54,162,235,0.6)' }]
  };

  return (
    <div>
      <h3>Dashboard</h3>
      <ExpenseForm onAdded={handleAdded} />
      <div style={{maxWidth:640}}>
        <Bar data={chartData} />
      </div>
      <ExpenseList items={items} onRemoved={handleRemoved} />
    </div>
  );
}
