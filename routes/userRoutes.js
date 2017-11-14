const express = require('express');
const router = express.Router();
const authGuard = require('../services/authGuard');
const userCtrl = require('../controllers/users/userCtrl');
const userContactCtrl = require('../controllers/users/userContactCtrl');
const userEventsCtrl = require('../controllers/users/userEventsCtrl');
const createContactCtrl = require('../controllers/users/createContactCtrl');
const createEventCtrl = require('../controllers/users/createEventCtrl');

// all /user routes are protected and require a jwt
router.use('/', authGuard);

// get a user by id
router.get('/:id', userCtrl);

// get a user's contacts
router.get('/:id/contacts', userContactCtrl);

// create a contact
router.post('/:id/contacts/create', createContactCtrl);

// get a user's events
router.get('/:id/events', userEventsCtrl);

// create an event
router.post('/:id/events/create', createEventCtrl);

module.exports = router;
