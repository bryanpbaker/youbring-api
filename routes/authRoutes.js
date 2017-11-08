const express = require('express');
const router = express.Router();
const passport = require('passport');
const facebookAuthCtrl = require('../controllers/facebookAuthCtrl');

router.get('/', (req, res) => {
  res.send('<h1>Auth</h1>');
});

router.post('/facebook', passport.authenticate('facebook-token'), facebookAuthCtrl);

module.exports = router;
