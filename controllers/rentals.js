const express = require('express');
const pool = require('../db');
const RentalsRouter = express.Router();

RentalsRouter.get("/", async(req, res) => {
  try {
    const rentals = await pool.query(
      `
        SELECT * FROM Rentals r 
        INNER JOIN Customers c ON r.customer_id = c.customer_id
        INNER JOIN Cars ca ON r.car_id = ca.car_id
      `);
    return res.json(rentals[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: "Internal Server Error" 
    });
  }
})

RentalsRouter.get("/rental", async (req, res) => {
  try {
    const rental_id = parseInt(req.query.rental_id);

    const rental = await pool.query("SELECT * FROM Rentals WHERE rental_id =?", [rental_id]);
    res.status(200).json(rental[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: "Internal Server Error" 
    });
  }
})

RentalsRouter.post("/create", async (req, res) => {
  try {
    const {
      rental_id,
      customer_id,
      car_id,
      rental_start_date,
      rental_end_date,
      return_date,
      rental_cost
    } = req.body;

    const newRental = await pool.query(
      "INSERT INTO Rentals (rental_id, customer_id, car_id, rental_start_date, rental_end_date, return_date, rental_cost) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [rental_id, customer_id, car_id, rental_start_date, rental_end_date, return_date, rental_cost]
    );

    return res.json({ 
      message: "Rental created successfully" 
    });
  }catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: "Internal Server Error" 
    });
  }
})

RentalsRouter.put("/update", async (req, res) => {
  try {
    const {
      customer_id,
      car_id,
      rental_start_date,
      rental_end_date,
      return_date,
      rental_cost
    } = req.body;

    const rental_id  = req.query.rental_id;

    const updatedRental = await pool.query(
      "UPDATE Rentals SET customer_id =?, car_id =?, rental_start_date =?, rental_end_date =?, return_date =?, rental_cost =? WHERE rental_id =?",
      [customer_id, car_id, rental_start_date, rental_end_date, return_date, rental_cost, rental_id]
    );

    res.json({ 
      message: "Rental updated successfully",
      updatedRental: updatedRental[0]
    });
  }catch(err) {
    console.error(err);
    res.status(500).json({ 
      error: "Internal Server Error" 
    });
  }
});

RentalsRouter.delete("/delete", async (req, res) => {
  try {
    const rental_id = parseInt(req.query.rental_id);

    const deletedRental = await pool.query("DELETE FROM Rentals WHERE rental_id =?", [rental_id]);

    res.json({ 
      message: "Rental deleted successfully" 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: "Internal Server Error" 
    });
  }
});

RentalsRouter.get("/pagination", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    const rentals = await pool.query("SELECT * FROM Rentals LIMIT ?,?", [offset, limit]);
    return res.json(rentals[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: "Internal Server Error" 
    });
  }
});

RentalsRouter.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const rentals = await pool.query("SELECT * FROM Rentals WHERE customer_id LIKE? OR car_id LIKE?", 
      ['%' + searchTerm + '%', '%' + searchTerm + '%']
    );
    return res.json(rentals[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: "Internal Server Error" 
    });
  }
});

module.exports = RentalsRouter;