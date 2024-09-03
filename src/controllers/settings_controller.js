'use strict';


const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/user_model');
const Blog = require('../models/blog_model');

const uploadToCloudinary = require('../config/cloudinary_config');

/**
 * @async
 * @function renderSettings
 * @param {object} req 
 * @param {object} res 
 * @throws {Error}
 */

const renderSettings = async (req,res) =>{
    try{
        const {username} = req.session.user;

        const currentUser = await User.findOne({username});

        res.render('./pages/settings', {
            sessionUser: req.session.user,
            currentUser
        })
    }catch(err){
        console.error('Error when rendering settings page', err);
        throw err;
    }
}

/**
 * @async
 * @function updateBasicInfo
 * @param {object} req 
 * @param {object} res
 */
const updateBasicInfo = async (req, res) =>{
    try{
        const {username: sessionUsername} = req.session.user;
        const currentUser = await User.findOne({username: sessionUsername})
        .select('profilePhoto name username email bio');

        const {
            profilePhoto,
            name,
            username,
            email,
            bio
        } = req.body;

        if(email){
            if(await User.exists({ email })){
                return res.status(400).json({ message: 'Email đã được liên kết với một tài khoản khác'});
            }
            currentUser.email = email;
        }
        if(username){
            if(await User.exists({username})){
                return res.status(400).json({ message: 'Tên tài khoản đã tồn tại. Hãy chọn một cái tên khác'});
            }
            currentUser.username = username;
            req.session.user.username = username;
        }
        if(profilePhoto){
            const public_id = currentUser.username;
            const imageURL = await uploadToCloudinary(profilePhoto, public_id);

            currentUser.profilePhoto = {
                url: imageURL,
                public_id
            }
            req.session.user.profilePhoto = imageURL;
        }

        currentUser.name = name;
        req.session.user.name = name;
        currentUser.bio = bio;

        await currentUser.save();
        res.sendStatus(200);
    }catch(err){
        console.error('Error when updating basic info', err);
        throw err;
    }
}


/**
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @throws {Error}
 */
const updatePassword = async (req, res) =>{
    try{
        const {username: sessionUsername} = req.session.user;
        const currentUser = await User.findOne({username: sessionUsername})
        .select('password');
        
        const{
            old_password,
            new_password,
        } =  req.body;
        
        const oldPasswordIsValid = await bcryptjs.compare(old_password, currentUser.password);
        
        if(!oldPasswordIsValid){
            return res.status(400).json({ message: 'Mật khẩu cũ không đúng'});
        }

        const newPassword = await bcryptjs.hash(new_password, 10);
        currentUser.password = newPassword;

        await currentUser.save();
        res.sendStatus(200);

    }catch(err){
        console.error('Error when updating password', err);
        throw err;
    }
}

/**
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @throws {Error}
 */
const deleteAccount = async (req, res) =>{
    try{
        const {username} = req.session.user;
        const currentUser = await User.findOne({username})
        .select('blogs');

        //xóa những blog mà tài khoản này đã tạo
        await Blog.deleteMany({_id: {$in: currentUser.blogs}});

        //xóa tài khoản hiện tại
        await User.deleteOne({username});

        //xóa tất cả các session của tài khoản hiện tại
        const Session = mongoose.connection.db.collection('sessions');
        await Session.deleteMany({session: {$regex: username , $options: 'i'}});
        //xóa session hiện tại có trong thiết bị người dùng
        req.session.destroy();

        res.sendStatus(200);


    }catch(err){
        console.error('Error when deleting account', err);
        throw err;
    }
}
module.exports = {
    renderSettings,
    updateBasicInfo,
    updatePassword,
    deleteAccount
};