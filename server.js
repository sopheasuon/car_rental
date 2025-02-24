const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const carController = require("./controllers/cars");
const customerController = require("./controllers/customer");
const rentalController = require("./controllers/rentals");
const locationController = require("./controllers/locations");
const reservationController = require("./controllers/reservations");
const path = require('path');
// const locationsRoutes = require("./routes/locationRoutes");
const apiController = require("./controllers/apiController");

const webapp = express(); 
webapp.use(helmet());
const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://code.jquery.com"],
  styleSrc: ["'self'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
  imgSrc: ["'self'"],
};

webapp.use(
  helmet.contentSecurityPolicy({
    directives: cspDirectives
  })
);


webapp.use(express.json());
webapp.set("view engine", "ejs");
webapp.use(bodyParser.urlencoded({ extended: true }));
webapp.use(express.urlencoded({ extended: true }));
webapp.use(express.static('views'));
webapp.use(express.static('components'));


webapp.use('/rentals', rentalController);
webapp.use('/customers', customerController);
webapp.use('/reservations', reservationController);

webapp.get("/", apiController.index);
webapp.get("/car-offer", apiController.carOffer);


webapp.get('/register', (req, res) => {
  res.render("pages/register");
});

webapp.get('/manage-booking', (req, res) => {
  res.render("pages/manage-booking");
});

webapp.get('/car-fleet', (req, res) => {
  res.render("pages/carFleet");
});
webapp.get('/contact-us', (req, res) => {
  res.render("pages/contact-us");
});
webapp.get('/faq', (req, res) => {
  res.send(`
    <h1>FAQ page coming soon!!</h1>
  `);
});

webapp.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email, 'Password:', password);  
  if (email && password) {
    req.session.customer = { email, password };
    return res.send("pages/profile");
  } else {
    res.status(401).send("Login failed");
  }
});

webapp.post('/submit-booking-form', (req, res) => {
  const { location, pickupDate, returnDate } = req.body;
  if (!location || !pickupDate || !returnDate) {
    return res.send(
        "Please check all fields.",
        );
  };
  res.redirect("/car-offer")
});


webapp.listen(8000, () => {
  console.log('Server listening on port 8000');
});