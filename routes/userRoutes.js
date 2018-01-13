const express = require('express');
const authGuard = require('../middleware/authGuard');
const userCtrl = require('../controllers/users/userCtrl');
const userContactCtrl = require('../controllers/users/userContactCtrl');
const createContactCtrl = require('../controllers/users/createContactCtrl');

const router = express.Router();

// all /user routes are protected and require a jwt
router.use('/', authGuard);

// get a user by id
router.get('/', userCtrl);

// get a user's contacts
router.get('/:id/contacts', userContactCtrl);

// create a contact
router.post('/:id/contacts/create', createContactCtrl);

module.exports = router;
