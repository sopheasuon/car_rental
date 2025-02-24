const prismaService = require('../services/prismaServices');
const apiService = require('../services/apiServices');

async function index(req, res) {
  try {
    const locations = await prismaService.getLocations();
    const apiLocations = await apiService.fetchLocations();
  
    res.render('pages/index', {
      locations,
      apiLocations
    });
  } catch(err) {
    console.error(err);
  }
}

async function carOffer(req, res, next) {
  try {
    const rentals = await prismaService.getRentals();
    console.log("cars: " + rentals);
    res.render('pages/car-offer', { rentals });
  } catch(err) {
    console.error(err);
  }
}

async function searchCarOffer(req, res) {
  try {
    const { model } = req.query;

    // Prepare the search parameters for the service
    const searchParams = { model };

    // Fetch the rentals based on the search parameters
    const rentals = await apiService.fetchRentals(searchParams);

    // Render the 'rentals' EJS view and pass the rentals data
    res.render('pages/car-offer', {
      rentals, 
      model: model || '',
    });
  } catch (error) {
    console.error("Error in apiController:", error);
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
}

module.exports = {index, carOffer, searchCarOffer};