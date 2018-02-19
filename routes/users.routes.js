const express = require('express');
const authGuard = require('../middleware/authGuard');
const users = require('../controllers/users/userCtrl');

const router = express.Router();

// get a user by id
router.get('/', authGuard, users.show);

module.exports = router;
