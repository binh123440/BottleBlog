'use strict';


const Blog = require('../models/blog_model');


const updateVisit = async (req,res) =>{
    try{
        const {blogId} = req.params;

        const visitedBlog = await Blog.findById(blogId)
        .select('totalVisit owner')
        .populate({
            path: 'owner',
            select: 'totalVisits'
        });
        
        visitedBlog.totalVisit++;
        await visitedBlog.save();

        visitedBlog.owner.totalVisits++;
        await visitedBlog.owner.save();

        res.sendStatus(200);
    }catch(err){
        console.error('Error when updating visit count', err);
        throw err;
    }
}

module.exports = updateVisit