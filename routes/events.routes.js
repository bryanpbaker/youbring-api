const express = require('express');
const authGuard = require('../middleware/authGuard');
const events = require('../controllers/events.controller');
const router = express.Router();

// all /user routes are protected and require a jwt
router.use('/', authGuard);

/**
 * INDEX
 * get all events
 */
router.get('/', events.index);

/**
 * SHOW
 * get a single event
 */
router.get('/:eventId', events.show);

/**
 * CREATE
 * create a new event
 */
router.post('/create', events.create);

module.exports = router;
