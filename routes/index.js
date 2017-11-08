const passport = require('passport');
const testCtrl = require('../controllers');
const authRoutes = require('./authRoutes');

module.exports = (app) => {
  app.use('/auth', passport.initialize(), authRoutes);
  app.get('/', testCtrl)
};
