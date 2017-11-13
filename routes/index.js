const passport = require('passport');
const testCtrl = require('../controllers');
const authRoutes = require('./authRoutes');
const apiRoutes = require('./apiRoutes');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/api', apiRoutes);
  app.get('/', testCtrl);
};
