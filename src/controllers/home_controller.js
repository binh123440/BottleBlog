'use strict';

const Blog = require('../models/blog_model');
const getPagination = require('../utils/get_pagination_util');


/**
 * @param {Object} req
 * @param {Object} res
 * @throws {Error}
 */

const renderHome = async (req, res) => {
    try{
        const totalBlogs = await Blog.countDocuments();
        const pagination = getPagination('/',req.params, 13, totalBlogs);
        console.log(pagination)

        const latestBlogs = await Blog.find()
        .select('banner author createdAt readingTime title reaction totalBookmark')
        .populate({
            path: 'owner',
            select: 'name username profilePhoto'
        })
        .sort({createdAt: 'desc'})
        .limit(pagination.limit)
        .skip(pagination.skip);

        // console.log(latestBlogs);
        res.render('./pages/home', {
            sessionUser: req.session.user,
            latestBlogs,
            pagination,
        });
    }catch(e){
        console.error('Error when rendering home page',e);
        throw e
    }
}
module.exports = renderHome