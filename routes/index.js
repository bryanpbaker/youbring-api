const passport = require('passport');
const testCtrl = require('../controllers');
const authRoutes = require('./authRoutes');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.get('/', testCtrl);
};
