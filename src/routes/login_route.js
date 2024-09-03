'use strict';

const router = require('express').Router();

const { renderLogin, postLogin } = require('../controllers/login_controller');

router.get('/', renderLogin);
router.post('/', postLogin);


module.exports = router;