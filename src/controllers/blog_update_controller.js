'use strict';

const Blog = require('../models/blog_model');

const uploadToCloudinary = require('../config/cloudinary_config')


/**
 * @param {Object} req
 * @param {Object} res
 * @throws {Error}
 */

const renderBlogEdit = async (req, res) => {
    try{
        const {blogId} = req.params;
        const {username} = req.session.user;

        const currentBlog = await Blog.findById(blogId)
        .select('banner title content owner')
        .populate({
            path:'owner',
            select: 'username'
        });

        if(currentBlog.owner.username !== username){
            return res.status(403).send('<h2>Xin lỗi, bạn không có quyền để chỉnh sửa bài viết này tại vì bạn không phải là tác giả của bài viết </h2>');
        };
        res.render('./pages/blog_update', {
            sessionUser: req.session.user,
            currentBlog,
        })

    }catch(error){
        console.log(error)
        throw error;
    }
}

const updateBlog = async (req, res) => {
    try{
        const { blogId} = req.params;
        const  {title, content, banner} = req.body;

        const updateBlog = await Blog.findById(blogId)
            .select('banner title content');
        
        if(banner){
            const bannerURL = await uploadToCloudinary(banner, updateBlog.banner.public_id);
            updateBlog.banner.url = bannerURL;
        }
        updateBlog.title = title;
        updateBlog.content = content;

        await updateBlog.save();
        res.sendStatus(200);

    }catch(e){
        console.error('Error when updating blog', e);
        throw e;
    }
}


module.exports = { renderBlogEdit, updateBlog } 