const express = require('express');
const router = express.Router();
const carController = require('../controllers/cars');

// console.log(carController); // This will help us see if the controller is correctly imported

// router.get('/', carController.getAllCars);

module.exports = router;
