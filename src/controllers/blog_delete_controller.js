'use strict';




/**
 * 
 */
const Blog = require('../models/blog_model');
const User = require('../models/user_model');

const deleteBlog = async (req, res) => {
    try{
        const {blogId} = req.params;
        const {username} = req.session.user;
        const deleteBlog = await Blog.findOne({_id: blogId})
        .select('reaction totalVisit');

        const currentUser = await User.findOne({username})
        .select('blogPublished totalVisits totalReactions blogs');

        currentUser.blogPublished--;
        currentUser.totalVisits -= deleteBlog.totalVisit;
        currentUser.totalReactions -= deleteBlog.reaction;
        currentUser.blogs.splice(currentUser.blogs.indexOf(blogId), 1);
        await currentUser.save();

        await Blog.deleteOne({_id: blogId});

        res.sendStatus(200);

     }catch(e){
        console.error('Error when deleting blog', err);
        throw err;
    }
}

module.exports = deleteBlog;