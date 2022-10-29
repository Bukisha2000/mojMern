const express = require('express');
const {Login,Register} = require('../controllers/WorkerController');
const router = express.Router();
const doubleEmail = require('../mid/doubleEmail');

router.post('/login',Login)
router.post('/register',doubleEmail,Register)

module.exports = router;

