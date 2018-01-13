const testCtrl = require('../controllers');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const contactRoutes = require('./contactRoutes');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/user', userRoutes);
  app.use('/events', eventRoutes);
  app.use('/contacts', contactRoutes);
  app.get('/', testCtrl);
};
