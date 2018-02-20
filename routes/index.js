const auth = require('./auth.routes');
const user = require('./user.routes');
const event = require('./events.routes');
const contact = require('./contacts.routes');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/user', user);
  app.use('/events', event);
  app.use('/contacts', contact);
};
