const express = require('express');
const authGuard = require('../middleware/authGuard');
const user = require('../controllers/user.controller');

const router = express.Router();

/**
 * SHOW
 * get current user
 */
router.get('/', authGuard, user.show);

/**
 * CREATE
 * create a new user
 */
router.post('/new', user.create);

module.exports = router;
