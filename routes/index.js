const auth = require('./auth.routes');
const users = require('./users.routes');
const event = require('./events.routes');
const contact = require('./contacts.routes');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/events', event);
  app.use('/contacts', contact);
};
