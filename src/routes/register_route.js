'use strict';

const router = require('express').Router();


const {renderRegister, postRegister} = require('../controllers/register_controller');

router.get('/', renderRegister);

//POST route để xử lý tác vụ submit cửa người dùng 

router.post('/', postRegister);

module.exports = router;