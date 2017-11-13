const express = require('express');
const userCtrl = require('../controllers/userCtrl');

const router = express.Router();

router.get('/user', userCtrl);

module.exports = router;
