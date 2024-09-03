'use strict';

import imagePreview from './utils/imagePreview.js';
import Snackbar from './snackbar.js';
import config from './config.js';
import imageAsDataURL from './utils/imageAsDataUrl.js';

const $imageField = document.querySelector('[data-image-field]');
const $imagePreview = document.querySelector('[data-image-preview]');
const $imagePreviewClear = document.querySelector('[data-image-preview-clear]');
const $progressBar = document.querySelector('[data-progress-bar]');


//bắt sự kiện để image field để có thể xem trước ảnh
$imageField.addEventListener('change', ()=>{
    imagePreview($imageField, $imagePreview);
});

/** cóa ảnh xem trước bằng các loại bỏ class 'show' ra khỏi preview container
 * @function clearImagePreview
 */

const clearImagePreview = function() {
    $imagePreview.classList.remove('show');
    $imagePreview.innerHTML = '';
};
//bắt sự kiện để xóa ảnh xem trước
$imagePreviewClear.addEventListener('click', clearImagePreview)



/**
 * xử lý sự kiện đăng blog
 */
const $form = document.querySelector('[data-form]');
const $publishBtn = document.querySelector('[data-submit-btn]');

const handleBlogUpdate = async(event) => {

    event.preventDefault();
    $publishBtn.setAttribute('disabled', '');
    const formData = new FormData($form);

    if(!formData.get('banner').size && !$imagePreview.hasChildNodes())
    {
        $publishBtn.removeAttribute('disabled');
        Snackbar({
            type: 'error',
            message: 'Please choose a image for the banner'
        });
        return;
    }
    if(formData.get('banner').size > config.blogBanner.maxByteSize){
        $publishBtn.removeAttribute('disabled');
        Snackbar({
            type: 'error',
            message: 'Please choose a image with size less than 5MB'
        });
        return;
    }
    if(!formData.get('banner').size && $imagePreview.hasChildNodes()){
        formData.delete('banner');
    }
    if(formData.get('banner')){
        formData.set('banner', await imageAsDataURL(formData.get('banner')));
    }
    const body = Object.fromEntries(formData.entries())
    
    $progressBar.classList.add('loading')

    const response = await fetch(window.location.href,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(body)
    });

    if(response.ok){
        $publishBtn.removeAttribute('disabled');
        Snackbar({message: 'Your blog has been updated successfully'});
        window.location = window.location.href.replace('/edit','');
        return
    }
    if(response.status === 400){
        $progressBar.classList.add('loading-end');
        $publishBtn.removeAttribute('disabled');
        const {message} = await response.json();
        Snackbar({
            type: 'error',
            message
        })

    }
   
    
}

$form.addEventListener('submit', handleBlogUpdate);