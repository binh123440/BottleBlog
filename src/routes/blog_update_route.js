'use strict';

const router = require('express').Router();

const { renderBlogEdit,updateBlog } = require('../controllers/blog_update_controller');


router.get('/:blogId/edit', renderBlogEdit);
router.put('/:blogId/edit', updateBlog);

module.exports = router