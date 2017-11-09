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

module.exports.createUser = (newUser) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (error, hash) => {
        newUser.password = hash;
        resolve(newUser.save());
        reject(error);
      });
    });
  })
};

module.exports.findUserByUserId = (userId) => {
  User.findOne({ userId });
};
