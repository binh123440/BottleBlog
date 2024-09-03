'use strict';



const User = require('../models/user_model');

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @throws {Error}
 */
const renderDashboard = async (req, res) => {
    try{
        const {username} = req.session.user;
        const loggedUser = await User.findOne({username})
        .select('totalVisits totalReactions blogPublished blogs')
        .populate({
            path: 'blogs',
            select: 'title createdAt updatedAt reaction totalVisit',
            options: {sort: {createdAt: 'desc'}}
        });

        res.render('./pages/dashboard',{
            sessionUser: req.session.user,
            loggedUser
        })
    }catch(e){
        console.error('Error when rendering dashboard', e);
        throw e;
    }
}

module.exports = renderDashboard;