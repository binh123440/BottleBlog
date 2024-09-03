'use strict';

const router = require('express').Router();

const renderHome = require('../controllers/home_controller');

router.get(['/', '/page/:pageNumber'], renderHome);


module.exports = router;