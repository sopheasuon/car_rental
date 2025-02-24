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

async function carOffer(req, res) {
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

    const searchParams = { model };

    const rentals = await apiService.fetchRentals(searchParams);

    res.render('pages/car-offer', {
      rentals, 
      model: model || '',
    });
  } catch (error) {
    console.error("Error in apiController:", error);
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
}

async function login(req, res) {
  try {
    res.render('components/loginModal');
  } catch(err) {
    console.error(err);
  }
}
module.exports = {index, carOffer, searchCarOffer, login};