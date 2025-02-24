const axios = require('axios');

async function fetchLocations() {
  try {
    const response = await axios.get('http://localhost:3000/api/locations');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchCars() {
  try {
    const response = await axios.get('http://localhost:3000/api/cars');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchRentals() {
  try {
    const response = await axios.get('http://localhost:3000/api/rentals');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {fetchLocations, fetchCars, fetchRentals};