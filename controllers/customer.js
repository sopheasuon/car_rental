const express = require('express');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const customersRouter = express.Router();

customersRouter.get('/', async (req, res) => {
  try {
    const customers = await pool.query('SELECT * FROM Customers'); 
    return res.json(customers[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});
customersRouter.get('/customer', async (req, res) => {
  try {
    const customer_id = req.query.customer_id;
    const customer = await pool.query('SELECT * FROM Customers WHERE customer_id = ?', [customer_id]);
    return res.json(customer[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json(
      { error: 'Internal Server Error' }
    ); 
  }
});

customersRouter.post('/create', async (req, res) => {
  try {
    const {
      customer_id, 
      first_name, 
      last_name, 
      address, 
      phone, 
      email, 
      driver_license,
      password,
    } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newCustomer = await pool.query(
      `INSERT INTO Customers (customer_id, first_name, last_name, address, phone, email, driver_license, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [customer_id, first_name, last_name, address, phone, email, driver_license, hashedPassword]
    );

    res.status(200).json({
      message: 'Customer created successfully'
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
});

customersRouter.put("/update", async (req, res) => {
  try {
    const {
      first_name, 
      last_name, 
      address, 
      phone, 
      email, 
      driver_license,
      password
    } = req.body;

    const customer_id = parseInt(req.query.customer_id);

    const updatedCustomer = await pool.query(
      'UPDATE Customers SET first_name =?, last_name =?, address =?, phone =?, email =?, driver_license =? , password =? WHERE customer_id =?',
      [first_name, last_name, address, phone, email, driver_license, password, customer_id]
    );

    res.status(200).json({
      message: 'Customer updated successfully'
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
})

customersRouter.delete("/delete", async (req, res) => {
  try {
    const customer_id = req.query.customer_id;
    const deletedCustomer = await pool.query('DELETE FROM Customers WHERE customer_id = ?', [parseInt(customer_id)]);
    res.status(200).json({
      message: 'Customer deleted successfully'
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
})

customersRouter.get("/search", async (req, res) => {
  try {
    const searchCustomer = req.query.searchCustomer;
    console.log('search', searchCustomer);
    const customers = await pool.query('SELECT * FROM Customers WHERE first_name LIKE? OR last_name LIKE?', 
      ['%' + searchCustomer + '%', '%' + searchCustomer + '%', '%']
    );
    return res.json(customers[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
})

customersRouter.get("/pagination", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    console.log('offset', offset);
    const customers = await pool.query('SELECT * FROM Customers LIMIT ?,?', [offset, limit]);
    return res.json(customers[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
})

module.exports = customersRouter