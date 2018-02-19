const express = require('express');
const authGuard = require('../middleware/authGuard');
const contacts = require('../controllers/contacts.controller');

const router = express.Router();

// all /user routes are protected and require a jwt
router.use('/', authGuard);

/**
 * INDEX
 * get all contacts
 */
router.get('/', contacts.index);

/**
 * CREATE
 * create new contact
 */
router.post('/new', contacts.create);

module.exports = router;
