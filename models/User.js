const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = require('./schemas/user.schema');

// make User available to other modules
const User = mongoose.model('users', UserSchema);
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
  const existingUser = await User.findOne({ email: newUser.email });

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
    const newUserSaved = await newUser.save();
    // return user
    return newUserSaved;
  }

  const newUserSaved = await newUser.save();

  return newUserSaved;
};


/*******************************************************
 * Sub document actions
 *******************************************************/
/**
 * find a user from the db
 * return the user's events
 * @param {String} userId
 * @returns {Array} events
 */
User.fetchEvents = async (userId) => {
  const user = await User.findOne({ userId });
  const { events } = user;

  return events;
};

/**
 * return a single event
 * from a user's events
 * @param {String} userId 
 * @param {String} eventId 
 * @returns {Object} event
 */
User.fetchSingleEvent = async (userId, eventId) => {
  const user = await User.findOne({ userId });
  const event = user.events.find(event => event.id === eventId);

  if (event) {
    return event;
  }
  
  return false;
}

/**
 * return a list of the user's contacts
 * @param {String} userId 
 */
User.fetchContacts = async (userId) => {
  const user = await User.findOne({ userId });
  const { contacts } = user;

  return contacts;
};
