const express = require('express');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const login = express.Router();

login.post('/', async (req, res) => {
  const { 
    email, 
    password 
  } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM Customers WHERE email = ?', [email]);
    
    const user = rows[0];
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // User is authenticated, store user ID in session
    // req.session.userId = user.customer_id;

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports = login;