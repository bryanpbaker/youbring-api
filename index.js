require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// cors
app.use(cors())

// morgan
app.use(morgan('tiny'));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Models
require('./models');
require('./models/userModel');

// Passport
require('./middleware/passportService');

app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes')(app);

// Run App
app.listen(PORT);
console.log(`App is running on PORT ${PORT}!`);
