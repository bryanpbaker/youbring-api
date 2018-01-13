const express = require('express');
const authGuard = require('../middleware/authGuard');
const eventsCtrl = require('../controllers/events/eventsCtrl');
const singleEventCtrl = require('../controllers/events/singleEventCtrl');

const router = express.Router();

// all /user routes are protected and require a jwt
router.use('/', authGuard);

// get a user's events
router.get('/', eventsCtrl);

// get a single event
router.get('/:eventId', singleEventCtrl);


module.exports = router;
