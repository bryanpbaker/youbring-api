const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const passport = require('passport');

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
console.log('App is running on PORT ' + PORT + '!');
