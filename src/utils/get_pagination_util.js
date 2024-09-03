'use strict';



/**
 * Khởi tạo Object phân trang dựa trên các tham số, giới hạn và tổng số blog trong yêu cầu(request)
 * @param {Object} reqParams
 * @param {number} limit
 * @param {number} totalBlogs
 * @returns {Object}
 */

const getPagination = (currentRoute,reqParams, limit, totalBlogs) => {
    console.log(currentRoute,reqParams, limit, totalBlogs);

    const currentPage = Number(reqParams.pageNumber) || 1;
    const skip = limit * (currentPage - 1);
    const totalPage = Math.ceil(totalBlogs/limit)

    const paginationObj = {
        next: totalBlogs > (currentPage * limit) ? `${currentRoute}page/${currentPage + 1}` : null,
        prev: skip && currentPage <= totalPage ? `${currentRoute}page/${currentPage - 1}` : null,
        totalPage ,
        currentPage,
        skip,
        limit
    };
    return paginationObj;

}

module.exports = getPagination;