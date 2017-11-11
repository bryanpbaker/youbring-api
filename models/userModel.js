const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

// create user schema
const userSchema = new Schema({
  isSocialUser: Boolean,
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

// make User available to other modules
const User = mongoose.model('users', userSchema);
module.exports = User;

/**
 * createUser takes a new User, checks the db for duplicates based on email.
 * If there is already a user, return false,
 * otherwise we'll salt and hash the password if there is one
 * and save the new User
 * @param  {User} newUser take a new User
 * @return {User}
 */
User.createUser = async (newUser) => {
  const existingUser = await User.findUserByEmail(newUser.email);

  if (existingUser) {
    // if the user exists and is a social user
    if (existingUser.isSocialUser) {
      return existingUser;
    }

    // if the user already exists and is not a social user
    return false;
  }

  if (newUser.password) {
    // salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);

    // set user password to hashed password
    newUser.password = hash;
    // save user
    newUser.save();
    // return user
    return newUser;
  }

  newUser.save();

  return newUser;
};

/**
 * findUserByEmail takes an email and searches the
 * db for a user with the given email address
 * @param  {[type]}  email [description]
 * @return {Promise}       [description]
 */
User.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};
