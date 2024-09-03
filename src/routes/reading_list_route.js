'use strict';

const router = require('express').Router();

const { renderReadingList } = require('../controllers/reading_list_controller');

router.get(['/', '/page/:pageNumber'] , renderReadingList);

module.exports = router;