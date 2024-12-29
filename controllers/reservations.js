const express = require('express');
const pool = require('../db');
const reservationsRouter = express.Router();

reservationsRouter.get('/', async (req, res) => {
  try {
    const reservations = await pool.query('SELECT * FROM Reservations'); 
    return res.json(reservations[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
});

reservationsRouter.get('/reservation', async (req, res) => {
  try {
    const reservation_id = parseInt(req.query.reservation_id);

    const reservation = await pool.query('SELECT * FROM Reservations WHERE reservation_id =?', [reservation_id]);
    return res.json(reservation[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
});

reservationsRouter.post('/create', async (req, res) => {
  try {
    const {
      reservation_id,
      customer_id,
      car_type,
      pickup_location_id,
      pickup_date,
      return_location_id,
      return_date
    } = req.body;

    const newReservation = await pool.query(
      'INSERT INTO Reservations (reservation_id, customer_id, car_type, pickup_location_id, pickup_date, return_location_id, return_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [reservation_id, customer_id, car_type, pickup_location_id, pickup_date, return_location_id, return_date]
    );

    return res.json({ 
      message: 'Reservation created successfully' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
});

reservationsRouter.put('/update', async (req, res) => {
  try {
    const {
      customer_id,
      car_type,
      pickup_location_id,
      pickup_date,
      return_location_id,
      return_date
    } = req.body;

    const reservation_id  = req.query.reservation_id;

    const updatedReservation = await pool.query(
      'UPDATE Reservations SET customer_id =?, car_type =?, pickup_location_id =?, pickup_date =?, return_location_id =?, return_date =? WHERE reservation_id =?',
      [customer_id, car_type, pickup_location_id, pickup_date, return_location_id, return_date, reservation_id]
    );

    return res.json({ 
      message: 'Reservation updated successfully',
      updatedReservation: updatedReservation[0]
    });
  }catch(err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
});

reservationsRouter.delete('/delete', async (req, res) => {
  try {
    const reservation_id  = req.query.reservation_id;

    const deletedReservation = await pool.query('DELETE FROM Reservations WHERE reservation_id =?', [reservation_id]);

    return res.json({ 
      message: 'Reservation deleted successfully',
      deletedReservation: deletedReservation[0]
    });
  }catch(err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
});

reservationsRouter.get('/search', async(req, res) => {
  try {
    const { 
      pickup_location_id, 
      return_location_id, 
      pickup_date, 
      return_date 
    } = req.query;

    const reservations = await pool.query(
      'SELECT * FROM Reservations WHERE pickup_location_id =? OR return_location_id =? OR pickup_date >=? OR return_date <=?',
      [pickup_location_id, return_location_id, pickup_date, return_date]
    );

    return res.json(reservations[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
});

reservationsRouter.get('/pagination', async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    const reservations = await pool.query(
      'SELECT * FROM Reservations LIMIT ?,?',
      [offset, limit]
    );

    return res.json(reservations[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
});

module.exports = reservationsRouter;

