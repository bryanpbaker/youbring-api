const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const authGuard = require('../services/authGuard');

const router = express.Router();

router.use('/', authGuard);

router.get('/user', userCtrl);

module.exports = router;
