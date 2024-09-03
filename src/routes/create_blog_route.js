'use strict';

const router = require('express').Router();

const {renderCreateBlog, postCreateBlog} = require('../controllers/create_blog_controller');

router.get('/', renderCreateBlog);
router.post('/', postCreateBlog);


module.exports = router;