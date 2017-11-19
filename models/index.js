const mongoose = require('mongoose');
const keys = require('../config/keys');


mongoose.connect(process.env.MONGO_URI);
