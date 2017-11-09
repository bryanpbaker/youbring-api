const express = require('express');
const passport = require('passport');
const facebookAuthCtrl = require('../controllers/facebookAuthCtrl');
const newUserCtrl = require('../controllers/newUserCtrl');
const loginCtrl = require('../controllers/loginCtrl');

const router = express.Router();

// placeholder test route
router.get('/', (req, res) => {
  res.send('<h1>Auth</h1>');
});

// create a new user with an email and password
router.post('/new-user', newUserCtrl);

// sign in with email and password
router.post('/login', loginCtrl);

// authenticate with facebook
router.post('/facebook', passport.authenticate('facebook-token'), facebookAuthCtrl);

module.exports = router;
