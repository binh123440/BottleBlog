'use strict';

const crypto = require('crypto');

const uploadToCloudinary = require('../config/cloudinary_config');
const Blog = require('../models/blog_model');
const User = require('../models/user_model');
const getReadingTime = require('../utils/get_reading_time_util');
/**
 * @param {Object} req
 * @param {Object} res
 */


const renderCreateBlog = (req, res) =>{
    res.render('./pages/create_blog', {
        sessionUser: req.session.user,
        route: req.originalUrl
    });
}

const postCreateBlog = async (req, res) =>{
    // console.log(req.body);
    try{
        const { banner, title, content } = req.body;

        const public_id = crypto.randomBytes(10).toString('hex');
        const bannerURL = await uploadToCloudinary(banner, public_id);
        // console.log(bannerURL);

        const user = await User.findOne({username: req.session.user.username}).select('_id blogs blogPublished');

        const newBlog = await Blog.create({
            banner: {
                url: bannerURL,
                public_id
            },
            title,
            content,
            owner: user._id,
            readingTime: getReadingTime(content),
        });

        user.blogs.push(newBlog._id);
        user.blogPublished++;
        await user.save();

        // console.log(newBlog)
        // console.log(user)
        res.redirect(`blogs/${newBlog._id}`);


    }catch(err){
        console.error('Error when creating new blog',err);
        return;
    }
}

module.exports = {
    renderCreateBlog,
    postCreateBlog
};