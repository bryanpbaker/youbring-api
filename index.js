const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Models
require('./models');
require('./models/userModel');

// Passport
require('./services/passportService');

app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes')(app);

// Run App
app.listen(PORT);
console.log(`App is running on PORT ${PORT}!`);
