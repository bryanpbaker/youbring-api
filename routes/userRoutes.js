const express = require('express');
const authGuard = require('../middleware/authGuard');
const userCtrl = require('../controllers/users/userCtrl');

const router = express.Router();

// all /user routes are protected and require a jwt
router.use('/', authGuard);

// get a user by id
router.get('/', userCtrl);

module.exports = router;
