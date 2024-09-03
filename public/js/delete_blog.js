'use strict';


import Snackbar from './snackbar.js';


const $blogDeleteBtnAll = document.querySelectorAll('[data-blog-delete-btn]');

/**
 * @async
 * @param {string} blogId 
 * @returns {Promise<void>}
 */
const handleBlogDelete = async (blogId) => {
    const confirmDelete = confirm('Are you sure you want to delete this blog?');

    if(!confirmDelete) return;
    console.log(`${window.location.origin}/blogs/${blogId}/delete`);
    const response = await fetch(`${window.location.origin}/blogs/${blogId}/delete`,{
        method: 'DELETE',
    })

    if(response.ok){
        window.location.reload();
        Snackbar({
            message: 'Blog deleted successfully'
        });
    }
}

$blogDeleteBtnAll.forEach($deleteBtn =>{
    const blogId = $deleteBtn.dataset.blogDeleteBtn;
    $deleteBtn.addEventListener('click', handleBlogDelete.bind(null,blogId));
})