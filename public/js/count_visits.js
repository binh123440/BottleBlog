'use strict';


/**
 * Tăng số lượt xem của bài viết hiện tại và cập nhật vào localStorage
 * @async
 * @function countVisit
 * @throws {Error}
 * 
 */

const  countVisit = async () =>{
    try{
        const response = await fetch(`${window.location}/visit`, {
            method: 'PUT'
        });

        if(response.ok){
            visitedBlogs.push(window.location.pathname);
            localStorage.setItem('visitedBlogs', JSON.stringify(visitedBlogs));
        }
        
    }catch(e){
        console.error('Error when counting visit', e);
        throw e;
    }
}



let visitedBlogs = localStorage.getItem('visitedBlogs');

if(!visitedBlogs) localStorage.setItem('visitedBlogs', JSON.stringify([]));

visitedBlogs = JSON.parse(localStorage.getItem('visitedBlogs'));

if (!visitedBlogs.includes(window.location.pathname)){
    countVisit()
}