'use strict';


/**
 * Đăng xuất bằng cách xóa session và chuyển hướng sang trang login 
 * @param {object} req
 * @param {object} res
 */
const logout = async (req, res) => {
    try{
        req.session.destroy();
        res.redirect('/');
    }catch(e){
        console.error('Error when logging out', e);
        throw e;
    }
}

module.exports = logout;