const express = require('express');
const authGuard = require('../middleware/authGuard');
const eventsCtrl = require('../controllers/events/eventsCtrl');
const contactsCtrl = require('../controllers/contacts/contactsCtrl');

const router = express.Router();

// all /user routes are protected and require a jwt
router.use('/', authGuard);

// get a user's contacts
router.get('/', contactsCtrl);


module.exports = router;
