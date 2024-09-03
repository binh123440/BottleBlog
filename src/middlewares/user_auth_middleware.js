'use strict';

/**
 * Function Middleware để kiểm tra người dùng đã được xác thực hay chưa 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */


const userAuth = (req, res, next) => {

    // Lấy thuộc tính 'userAuthenticated' từ object 'user session'. Nêú object 'session.user' không xác định hoặc là rỗng
    // thì nó sẽ mặc đinh truy cập đến một object rỗng '{}'. Điều này cho phép truy cập 
    // đến 'userAuthenticated' một cách an toàn mà không cần phải bắt lỗi vì truy cập vào object hay thuộc tính undefined

    const { userAuthenticated } = req.session.user || {};

    if(userAuthenticated) return next();

    res.redirect('/login');


}

module.exports = userAuth;