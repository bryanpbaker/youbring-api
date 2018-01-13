const testCtrl = require('../controllers');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/user', userRoutes);
  app.use('/events', eventRoutes);
  app.get('/', testCtrl);
};
