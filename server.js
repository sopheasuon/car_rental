const express = require('express');

const customers = require('./controllers/customer');
const cars = require('./controllers/cars');
const locations = require('./controllers/locations');
const rentals = require('./controllers/rentals');
const reservations = require('./controllers/reservations');
const login = require('./controllers/login');

const app = express(); 
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static('views'));

app.get('/', (req, res) => {
  res.render('index');
});


app.use('/api/customers', customers);
app.use('/api/cars', cars);
app.use('/api/locations', locations);
app.use('/api/rentals', rentals);
app.use('/api/reservations', reservations);
app.use('/api/login', login);

// async function queryDatabase() {
//   try {
//     const customers = await pool.query('SELECT * FROM Customers'); 
//     console.log(customers[0]); 
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// queryDatabase(); 


app.listen(8000, () => {
  console.log('Server listening on port 8000');
});