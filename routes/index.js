const testCtrl = require('../controllers');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/user', userRoutes);
  app.get('/', testCtrl);
};
