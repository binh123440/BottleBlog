'use strict';

const router = require('express').Router();

const deleteBlog = require('../controllers/blog_delete_controller');


router.delete('/:blogId/delete', deleteBlog)


module.exports = router;