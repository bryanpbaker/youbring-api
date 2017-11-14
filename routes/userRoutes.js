const express = require('express');
const router = express.Router();
const authGuard = require('../services/authGuard');
const userCtrl = require('../controllers/userCtrl');

router.use('/', authGuard);

router.get('/:id', userCtrl);

module.exports = router;
