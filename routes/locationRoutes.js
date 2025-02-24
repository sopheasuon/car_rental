const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');

router.get('/locations', locationsController.fetchLocations);

module.exports = router;