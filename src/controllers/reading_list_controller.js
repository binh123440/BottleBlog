'use strict';


const User = require('../models/user_model');
const Blog = require('../models/blog_model');
const getPagination = require('../utils/get_pagination_util')



/**
 * Cập nhật số lượng reaction của một blog
 * 
 * @param {Object} req
 * @param {Object} res
 * @throws {Error}
 */

const updateReadingList = async (req, res) => {
    try{
        if(!req.session.user) return res.sendStatus(401);

        const {username} = req.session.user;
        const {blogId} = req.params;

        const currentUser = await User.findOne({username}).select('readingList');
        if (currentUser.readingList.includes(blogId)){
            return res.sendStatus(400);
        }

        currentUser.readingList.push(blogId);
        await currentUser.save();

        const readingListBlog = await Blog.findById(blogId)
        .select('totalBookmark')
        
        readingListBlog.totalBookmark++;
        await readingListBlog.save();

        res.sendStatus(200);

    }catch(e){
        console.error('Error whe updating Bookmarks', e);
        throw e;
   }
}

/**
 * Xóa một bookmark khỏi một reading list
 * @param {Object} req 
 * @param {Object} res 
 * @throws {Error}
 */
const deleteFromReadingList = async (req, res) => {
    try{
        if(!req.session.user) return res.sendStatus(401);

        const {username} = req.session.user;
        const {blogId} = req.params;

        const currentUser = await User.findOne({username}).select('readingList');
        if (!currentUser.readingList.includes(blogId)){
            return res.sendStatus(400);
        }

        currentUser.readingList.splice(currentUser.readingList.indexOf(blogId), 1);
        await currentUser.save();

        const readingListBlog = await Blog.findById(blogId)
        .select('totalBookmark')
        
        readingListBlog.totalBookmark--;
        await readingListBlog.save();

        res.sendStatus(200);


    }catch(e){
        console.error('Error when delete Reactions', e);
        throw e;
   }
}

const renderReadingList = async (req, res) => {
    try{
        const {username} = req.session.user;
        const {readingList} = await User.findOne({username}).select('readingList');

        const pagination = getPagination('/readinglist', req.params, 20, readingList.length);
        const readingListBlogs = await Blog.find({_id: {$in: readingList}})
        .select('owner createdAt readingtime tiltr reaction totalBookmark')
        .populate({
            path: 'owner',
            select: 'name username profilePhoto'
        })
        .limit(pagination.limit)
        .skip(pagination.skip);

        res.render('./pages/reading_list',{
            sessionUser: req.session.user,
            readingListBlogs,
            pagination,
        })



    }catch(e){
        console.error('Error when rendering Reading List', e);
        throw e;
    }
}



module.exports = {
    updateReadingList,
    deleteFromReadingList,
    renderReadingList
};