const express = require('express');
const router = express.Router();
const authGuard = require('../services/authGuard');
const userCtrl = require('../controllers/userCtrl');
const userContactCtrl = require('../controllers/userContactCtrl');
const userEventsCtrl = require('../controllers/userEventsCtrl');

router.use('/', authGuard);

router.get('/:id', userCtrl);

router.get('/:id/contacts', userContactCtrl);

router.get('/:id/events', userEventsCtrl);

module.exports = router;
