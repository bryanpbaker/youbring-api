const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new FacebookTokenStrategy(
  {
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret,
    profileFields: ['id', 'emails', 'name']
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ userId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            userId: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value,
          }).save()
            .then(user => done(null, user));
        }
      });
  },
));
