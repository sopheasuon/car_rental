const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// const carController = require("./controllers/cars");
const customerController = require("./controllers/customer");
const rentalController = require("./controllers/rentals");
// const locationController = require("./controllers/locations");
const reservationController = require("./controllers/reservations");
const path = require('path');
const carRoutes = require('./routes/carRoutes');
const {fetchLocations, locationController} = require('./controllers/locations');
const locationsRoutes = require("./routes/locationRoutes");
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
webapp.use(express.static('views'));
// webapp.set('views', path.join(__dirname, 'views', 'pages'));
// webapp.use('/style', express.static(path.join(__dirname, 'pages', 'style')));
webapp.use(express.static('components'));

webapp.use('/rentals', rentalController);
webapp.get("/", apiController.index);
webapp.get("/car-offer", apiController.carOffer);


webapp.get('/register', (req, res) => {
  res.render("pages/register");
});

// Login route to authenticate user
webapp.get("/login", (request, response) => {
  const { email, password } = request.query;
  if (email === "admin" && password === "admin") {
    request.session.customer = { email, password };
    return response.send("Login successful");
  } else {
    response.status(401).send("Login failed");
  }
});


webapp.post('/submit-booking-form', (req, res) => {
  const { location, pickupDate, returnDate } = req.body;

  console.log('Location:', location);
  console.log('Pick-up Date:', pickupDate);
  console.log('Return Date:', returnDate);

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