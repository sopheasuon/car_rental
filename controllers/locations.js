const express = require('express');
const pool = require('../db');
const LocationsRouter = express.Router();

LocationsRouter.get('/', async (req, res) => {
  try {
    const locations = await pool.query('SELECT * FROM Locations'); 
    return res.json(locations[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

LocationsRouter.get('/location', async (req, res) => {
  try {
    const location_id = parseInt(req.query.location_id);
    console.log('location_id: ' + location_id);
    const location = await pool.query('SELECT * FROM Locations WHERE location_id = ?', [location_id]);
    res.status(200).json(location[0]); 
  }catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
})

LocationsRouter.post('/create', async (req, res) => {
  try {
    const {
      location_id,
      location_name,
      address
    } = req.body;

    const newLocation = await pool.query(
      'INSERT INTO Locations (location_id, location_name, address) VALUES (?, ?, ?)', 
      [location_id, location_name, address]
    ); 

    return res.json({
      message: 'Location created successfully'
    }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

LocationsRouter.put("/update", async (req, res) => {
  try {
    const {
      location_name,
      address
    } = req.body;

    const location_id = parseInt(req.query.location_id);

    const updatedLocation = await pool.query(
      'UPDATE Locations SET location_name =?, address =? WHERE location_id =?', 
      [location_name, address, location_id]
    ); 

    return res.json({
      message: 'Location updated successfully'
    }); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

LocationsRouter.delete("/delete", async (req, res) => {
  try {
    const location_id = parseInt(req.query.location_id);
    const deletedLocation = await pool.query('DELETE FROM Locations WHERE location_id =?', [location_id]);

    return res.json({
      message: 'Location deleted successfully'
    }); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

LocationsRouter.get("/search", async (req, res) => {
  try {
    const searchLocation = req.query.searchLocation;

    const locations = await pool.query('SELECT * FROM Locations WHERE location_name LIKE? OR address LIKE?', 
      ['%' + searchLocation + '%', '%' + searchLocation + '%']
    );
    return res.json(locations[0]); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

LocationsRouter.get("/paginations", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;

    const locations = await pool.query('SELECT * FROM Locations LIMIT ?,?', [startIndex, limit]);
    return res.json(locations[0]); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    }); 
  }
})

module.exports = LocationsRouter;