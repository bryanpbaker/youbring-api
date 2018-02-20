const mongoose = require('mongoose');
const { Schema } = mongoose;
const ContactSchema = require('./contact.schema');
const ItemSchema = require('./item.schema');

module.exports = new Schema({
  name: String,
  date: Date,
  description: String,
  location: String,
  time: String,
  invitees: [ContactSchema],
  items: [ItemSchema],
});