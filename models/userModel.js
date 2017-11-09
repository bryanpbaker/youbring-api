const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

// create user schema
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

// make User available to other modules
const User = mongoose.model('users', userSchema);
module.exports = User;

/**
 * createUser takes a new User, checks the db for duplicates based on email.
 * If there is already a user, we reject with the existingUser,
 * otherwise we'll salt and hash the password if there is one
 * and resolve by saving the new User
 * @param  {User} newUser take a new User
 * @return {Promise}
 */
User.createUser = (newUser) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: newUser.email })
      .then((existingUser) => {
        if (existingUser) {
          reject(existingUser);
        } else {
          if (newUser.password) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (error, hash) => {
                newUser.password = hash;
                resolve(newUser.save());
                reject(error);
              });
            });
          }

          resolve(newUser.save());
        }
      });
  });
};

User.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};
