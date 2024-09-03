'use strict';


const router = require('express').Router();



const {renderSettings, updateBasicInfo, updatePassword, deleteAccount} = require('../controllers/settings_controller');


router.get('/', renderSettings);

router.put('/basic_info', updateBasicInfo);

router.put('/password', updatePassword);

router.delete('/account', deleteAccount );

module.exports = router;
