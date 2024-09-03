'use strict';


const router = require('express').Router();

const renderDashboard = require('../controllers/dashboard_controller');


router.get('/', renderDashboard);

module.exports = router