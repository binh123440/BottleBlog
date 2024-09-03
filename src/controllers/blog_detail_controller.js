'use strict';

const mongoose = require('mongoose')


const Blog = require('../models/blog_model');
const User = require('../models/user_model');
const markdown = require('../config/markdown_it_config');

/**
 * Lấy và hiển thị chi tiết blog
 * @param {object} req 
 * @param {object} res 
 * @throws {Error}  
 */

const renderBlogDetail = async (req, res) => {
    try {
        const {blogId} = req.params;

        const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);
        if (!isValidObjectId) {
            return res.render('./pages/404')
        }
        const blogExists = await Blog.exists({_id: new mongoose.Types.ObjectId(blogId)});
        if(!blogExists) {
            return res.render('./pages/404')
        }
        const blog = await Blog.findById(blogId).populate({
            path: 'owner',
            select: 'name username profilePhoto',
        });
        // console.log(blog);

        const ownerBlogs = await Blog.find({owner: { _id: blog.owner._id } })
        .select('title reaction totalBookmark owner readingTime cearedAt')
        .populate({
            path: 'owner',
            select: 'name username profilePhoto',
        }).where('_id').nin(blogId)
        .sort({ creatAt: 'desc'})
        .limit(3);

        //Kiểm tra rằng người dùng đã react hoặc là gắn bookmark bài viết này chưa bằng cách lấy dữ
        // liệu những bài viết đã react hoặc bookmark từ session của người dùng hiện tại
        let user;
        if(req.session.user){
            user = await User.findOne({
                username: req.session.user.username
            }).select('reactedBlogs readingList');
        }



        res.render('./pages/blog_detail', {
            sessionUser: req.session.user,
            blog,
            ownerBlogs,
            user,
            markdown
        });
    } catch (e) {
        console.error('Error when rendering blog detail page', e);
        throw e;
    }
};

module.exports = renderBlogDetail;