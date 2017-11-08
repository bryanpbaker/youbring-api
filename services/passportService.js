const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new FacebookTokenStrategy({
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ facebookId: profile.id }).save()
            .then(user => done(null, user));
        }
      })
  }
));
