import React from 'react';
import api from '../api';

export default function ExpenseList({ items, onRemoved }){
  async function remove(id){
    try{
      await api.delete('/api/expenses/'+id);
      onRemoved && onRemoved(id);
    }catch(err){ console.error(err); }
  }

  return (
    <div>
      <h4>Recent expenses</h4>
      <ul>
        {items.map(it=> (
          <li key={it._id}>{it.category} — {it.amount} — {new Date(it.date).toLocaleDateString()} <button onClick={()=>remove(it._id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
}
