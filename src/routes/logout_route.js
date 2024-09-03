'use strict';

const router = require('express').Router();

const logout = require('../controllers/logout_controller');

router.post('/', logout);


module.exports = router;