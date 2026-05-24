const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');

app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

async function start(){
  try{
    await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true});
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log('Server running on port', PORT));
  }catch(err){
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
