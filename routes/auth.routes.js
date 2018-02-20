const express = require('express');
const passport = require('passport');
const auth = require('../controllers/auth.controller')

const router = express.Router();

/**
 * EMAIL AUTH
 * sign in with email and password
*/
router.post('/', auth.emailAuth);

/**
 * FACEBOOK AUTH
 * sign in with facebook
 */
router.post('/facebook', passport.authenticate('facebook-token'), auth.facebookAuth);

module.exports = router;
