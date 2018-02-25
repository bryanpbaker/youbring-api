const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  name: String,
  description: String,
  quantity: Number,
  isAssigned: Boolean || Object,
  canBeReplaced: Boolean,
  confirmed: Boolean
});