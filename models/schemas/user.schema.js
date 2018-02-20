const mongoose = require('mongoose');
const { Schema } = mongoose;
const ContactSchema = require('./contact.schema');
const EventSchema = require('./event.schema');

module.exports = new Schema({
  isSocialUser: Boolean,
  userId: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: String,
  contacts: [ContactSchema],
  events: [EventSchema],
});