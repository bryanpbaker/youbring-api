const express = require('express');
const authGuard = require('../middleware/authGuard');
const userCtrl = require('../controllers/users/userCtrl');
const userContactCtrl = require('../controllers/users/userContactCtrl');
const userEventsCtrl = require('../controllers/users/userEventsCtrl');
const createContactCtrl = require('../controllers/users/createContactCtrl');
const createEventCtrl = require('../controllers/events/createEventCtrl');
const singleEventCtrl = require('../controllers/events/singleEventCtrl');

const router = express.Router();

// all /user routes are protected and require a jwt
router.use('/', authGuard);

// get a user by id
router.get('/', userCtrl);

// get a user's contacts
router.get('/:id/contacts', userContactCtrl);

// create a contact
router.post('/:id/contacts/create', createContactCtrl);

// get a user's events
router.get('/:id/events', userEventsCtrl);

// create an event
router.post('/:id/events/create', createEventCtrl);

// get a single event
router.get('/:id/events/:eventId', singleEventCtrl);

module.exports = router;
