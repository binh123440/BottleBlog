'use strict';

const bcryptjs = require('bcryptjs');


const User = require('../models/user_model');
const generateUsername = require('../utils/generate_username_util');

/**
 * Render ra trang  đăng ký
 * @param {object} req Object yêu cầu
 * @param {object} res object phản hồi
 */

const renderRegister = (req,res) =>{
    const {userAuthenticated} = req.session.user || {};
    // console.log(req.session.user);
    if(userAuthenticated){
        return res.redirect('/');
    }
    res.render('./pages/register');
}

/**
 * Xử lý tác vụ đăng ký cho người dùng mới 
 * @param {Object} req 
 * @param {Object} res 
 * @return {Promise<void>}
 * @throws {Error}
 */
const postRegister = async (req,res) =>{
    try{
        const {name, email, password} = req.body;
        const username = generateUsername(name);
        // console.log(username);

        const hashPassword = await bcryptjs.hash(password,10);
        // console.log(password,hashPassword);  
        
        await User.create({name ,email, password: hashPassword, username});
        res.redirect('/login');

    }catch(e){
        if(e.code === 11000){
            if (e.keyPattern.email){
                return res.status(400).json({message: 'This email is already associated with an account'})
            }
            if (e.keyPattern.username){
                return res.status(400).json({message: 'This username is already associated with an account'})
            }
        }else{
            return res.status(400).send({message: `Failed to register user.<br>${e.message}`})
        }
        console.log('postRegister:', e.message)
        throw e;
    }
}

module.exports ={
    renderRegister,
    postRegister
}