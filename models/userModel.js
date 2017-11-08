const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: String,
  first_name: String,
  last_name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: String,
  contacts: [Object],
  events: [Object],
});

const User = mongoose.model('users', userSchema);
module.exports = User;

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
