'use strict';

const User = require('../models/user_model')
const bcryptjs = require('bcryptjs');

/**
 * @param {Object} req 
 * @param {Object} res
*/

const renderLogin = (req, res) =>{
    const {userAuthenticated} = req.session.user || {};
    // console.log(req.session.user);
    if(userAuthenticated){
        return res.redirect('/');
    }
    res.render('./pages/login');
}

/**
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
const postLogin = async (req, res) =>{
    try{
        // console.log(req.body);
        const {email , password} = req.body;
        const currentUser = await User.findOne({email})
        // console.log(currentUser)
        if(!currentUser){
            return res.status(400).json({message: 'Invalid email !, Please ensure that the email you entered has already used to create an account.'})
        }
        const passwordIsValid = await bcryptjs.compare(password, currentUser.password)
        if(!passwordIsValid){
            return res.status(400).json({message: 'Wrong Password !, Please ensure that you entered correct password and try again'})
        }
        req.session.user = {
            userAuthenticated: true,
            name: currentUser.name,
            username: currentUser.username,
            profilePhoto: currentUser.profilePhoto?.url
        }
        return res.redirect('/')
    }catch(e){
        console.log('Error logging in',e.message);
        throw e;
    }
}

module.exports = {
    renderLogin,
    postLogin
}