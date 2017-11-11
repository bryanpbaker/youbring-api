const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const mongoose = require('mongoose');
const keys = require('../config/keys');

// User Model
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Create FacebookTokenStrategy
passport.use(new FacebookTokenStrategy(
  {
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret,
    profileFields: ['id', 'emails', 'name'],
  },
  async (accessToken, refreshToken, profile, done) => {
    // call createUser model method with new User
    const user = await User.createUser(new User({
      isSocialUser: true,
      userId: profile.id,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile.emails[0].value,
    }));

    // Whether there was an existing user, or
    // one was created.. return the user
    done(null, user);
  },
));
