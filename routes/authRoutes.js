const express = require('express');
const passport = require('passport');
const facebookAuthCtrl = require('../controllers/facebookAuthCtrl');
const newUserCtrl = require('../controllers/newUserCtrl');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>Auth</h1>');
});

router.post('/new-user', newUserCtrl)

router.post('/facebook', passport.authenticate('facebook-token'), facebookAuthCtrl);

router.post(
  '/email', passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Success!!');
  },
);

module.exports = router;
