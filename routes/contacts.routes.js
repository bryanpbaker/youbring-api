const express = require('express');
const authGuard = require('../middleware/authGuard');
const contactsCtrl = require('../controllers/contacts/contactsCtrl');
const createContactCtrl = require('../controllers/contacts/createContactCtrl');

const router = express.Router();

// all /user routes are protected and require a jwt
router.use('/', authGuard);

// get a user's contacts
router.get('/', contactsCtrl);

// create a contact
router.post('/new', createContactCtrl);

module.exports = router;
