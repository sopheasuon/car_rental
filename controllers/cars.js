const express = require('express');
const pool = require('../db');
const carsRouter = express.Router();

carsRouter.get('/', async (req, res) => {
  try {
    const cars = await pool.query('SELECT * FROM Cars'); 
    return res.json(cars[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

carsRouter.get('/car', async (req, res) => {
  try {
    const car_id = req.query.car_id;
    const cars = await pool.query('SELECT * FROM Cars WHERE car_id = ?', [car_id]);
    
    return res.json(cars[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

carsRouter.post('/create', async (req, res) => {
  try {
    const {
      car_id,
      make,
      model,
      year,
      color,
      vehicle_type,
      status
    } = req.body;

    const newCar = await pool.query(
      'INSERT INTO Cars (car_id, make, model, year, color, vehicle_type, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [car_id, make, model, year, color, vehicle_type, status]
    ); 
    return res.json({
      message: 'Car created successfully'
    }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

carsRouter.put("/update", async (req, res) => {
  try {
    const {
      make,
      model,
      year,
      color,
      vehicle_type,
      status 
    } = req.body;

    const car_id = req.query.car_id;

    const updatedCar = await pool.query(
      'UPDATE Cars SET make =?, model =?, year =?, color =?, vehicle_type =?, status =? WHERE car_id =?', 
      [make, model, year, color, vehicle_type, status, car_id]
    ); 

    return res.json({
      message: 'Car updated successfully'
    }); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

carsRouter.delete("/delete", async (req, res) => {
  try {
    const car_id = req.query.car_id;
    const deletedCar = await pool.query('DELETE FROM Cars WHERE car_id =?', [car_id]);

    return res.json({
      message: 'Car deleted successfully'
    }); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

carsRouter.get("/search", async (req, res) => {
  try {
    const searchCar = req.query.searchCar;
    console.log('search', searchCar);
    const cars = await pool.query('SELECT * FROM Cars WHERE make LIKE? OR model LIKE? OR year LIKE? OR color LIKE? OR vehicle_type OR status LIKE?', 
      ['%' + searchCar + '%', '%' + searchCar + '%', '%' + searchCar + '%', '%' + searchCar + '%', '%' + searchCar + '%', '%' + searchCar + '%']
    );

    return res.json(cars[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

carsRouter.get("/pagination", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    const cars = await pool.query('SELECT * FROM Cars LIMIT ?,?', [offset, limit]);
    return res.json(cars[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})
module.exports = carsRouter;