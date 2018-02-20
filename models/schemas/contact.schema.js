const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  firstName: String,
  lastName: String,
  phone: Number,
  email: String,
});