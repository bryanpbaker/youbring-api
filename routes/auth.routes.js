const express = require('express');
const passport = require('passport');
const facebookAuthCtrl = require('../controllers/auth/facebookAuthCtrl');
const newUserCtrl = require('../controllers/auth/newUserCtrl');
const loginCtrl = require('../controllers/auth/loginCtrl');

const router = express.Router();

/**
 * CREATE
 * create a new user
 */
router.post('/new-user', newUserCtrl);

/**
 * EMAIL AUTH
 * sign in with email and password
*/
router.post('/login', loginCtrl);

/**
 * FACEBOOK AUTH
 * sign in with facebook
 */
router.post('/facebook', passport.authenticate('facebook-token'), facebookAuthCtrl);

module.exports = router;
