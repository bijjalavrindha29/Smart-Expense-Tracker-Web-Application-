const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

function toCSV(records){
  const headers = ['amount','category','description','date'];
  const rows = records.map(r => [r.amount, r.category, (r.description||'').replace(/\n/g,' '), new Date(r.date).toISOString()]);
  const csv = [headers.join(','), ...rows.map(r=> r.map(v=> '"'+String(v).replace(/"/g,'""')+'"').join(','))].join('\n');
  return csv;
}

// create expense
router.post('/', [ auth, check('amount', 'Amount is required and must be numeric').isNumeric(), check('category', 'Category is required').notEmpty() ], async (req, res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try{
    const exp = new Expense({ ...req.body, user: req.user.id });
    await exp.save();
    res.json(exp);
  }catch(err){
    console.error(err); res.status(500).send('Server error');
  }
});

// get user's expenses
router.get('/', auth, async (req, res) =>{
  try{
    const items = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(items);
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// export CSV of user's expenses
router.get('/export', auth, async (req, res) =>{
  try{
    const items = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    const csv = toCSV(items);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="expenses.csv"');
    res.send(csv);
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// update
router.put('/:id', auth, async (req, res) =>{
  try{
    let exp = await Expense.findById(req.params.id);
    if(!exp) return res.status(404).json({ msg: 'Not found' });
    if(exp.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    exp = await Expense.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(exp);
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// delete
router.delete('/:id', auth, async (req, res) =>{
  try{
    const exp = await Expense.findById(req.params.id);
    if(!exp) return res.status(404).json({ msg: 'Not found' });
    if(exp.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await exp.remove();
    res.json({ msg: 'Deleted' });
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
