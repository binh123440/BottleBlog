'use strict';

import Snackbar from './snackbar.js';
import imagePreview from './utils/imagePreview.js';
import imageAsDataURL from './utils/imageAsDataUrl.js';
import config from './config.js';

const $imageField = document.querySelector('[data-image-field]');
const $imagePreview = document.querySelector('[data-image-preview]');
const $imagePreviewClear = document.querySelector('[data-image-preview-clear]');

$imageField.addEventListener('change',  () => {
    imagePreview($imageField, $imagePreview);
})  

const clearImagePreview = () => {
    $imagePreview.classList.remove('show');
    $imagePreview.innerHTML = '';
    $imageField.value = '';
}
$imagePreviewClear.addEventListener('click', clearImagePreview);

const $basicInfoForm = document.querySelector('[data-basic-info-form]');
const $basicInfoSubmit = document.querySelector('[data-basic-info-submit]');
const oldFormData = new FormData($basicInfoForm);
const $progressBar = document.querySelector('[data-progress-bar]');

const updateBasicInfo = async (event) => {

    event.preventDefault();

    $basicInfoSubmit.setAttribute('disabled', '');

    const formData = new FormData($basicInfoForm);
    if(formData.get('profilePhoto').size > config.profilePhoto.maxByteSize){
        $basicInfoSubmit.removeAttribute('disabled');
        Snackbar({
            type: 'error',
            message: 'Please choose a image with size less than 1MB'
        });
        return;
    }

    if(!formData.get('profilePhoto').size){
        formData.delete('profilePhoto');
    }else{
        formData.set('profilePhoto', await imageAsDataURL($imageField.files[0]));
    }
    if(formData.get('username') === oldFormData.get('username')){
        formData.delete('username');
    }
    if(formData.get('email') === oldFormData.get('email')){
        formData.delete('email');
    }
    const body = Object.fromEntries(formData.entries());

    $progressBar.classList.add('loading');
    const response = await fetch(`${window.location.href}/basic_info`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if(response.ok){
        $basicInfoSubmit.removeAttribute('disabled');
        $progressBar.classList.add('loading-end');
        Snackbar({
            type: 'success',
            message: 'Update basic info successfully'
        });
        window.location.reload();
    }
    if(response.status === 400){
        $basicInfoSubmit.removeAttribute('disabled');
        $progressBar.classList.add('loading-end');
        const { message } = await response.json();
        Snackbar({
            type: 'error',
            message
        });
    }
}

$basicInfoForm.addEventListener('submit', updateBasicInfo);


//Update password

const $passwordForm = document.querySelector('[data-password-form]');
const $passwordSubmit = document.querySelector('[data-password-submit]');

const updatePassword = async (event) => {
    event.preventDefault();

    //ẩn nút submit để tránh trường hợp người dùng nhấn nhiều lần
    $passwordSubmit.setAttribute('disabled', '');

    //tạo một đối tượng FormData từ form
    const formData = new FormData($passwordForm);
    
    //Xử lí trường hợp khi mật khẩu mới không trùng khớp
    if(formData.get('new_password') !== formData.get('confirm_password')){
        $passwordSubmit.removeAttribute('disabled');
        Snackbar({
            type: 'error',
            message: 'Password and confirm password do not match'
        });
        return;
    }

    //Tạo một object từ FormData
    const body = Object.fromEntries(formData.entries());

    //Hiện progress bar
    $progressBar.classList.add('loading');

    //gửi dữ liệu từ formdata lên server để câp nhật mật khẩu
    const response = await fetch(`${window.location.href}/password`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    //Xử lí kết quả ok trả về từ server
    if(response.ok){
        $passwordSubmit.removeAttribute('disabled');
        $progressBar.classList.add('loading-end');
        Snackbar({
            type: 'success',
            message: 'Update password successfully'
        });
        $passwordForm.reset();
        return;
    }

    //Xử lí trường hợp server trả về 400 (Bad Request)
    if(response.status === 400){
        $passwordSubmit.removeAttribute('disabled');
        $progressBar.classList.add('loading-end');
        const { message } = await response.json();
        Snackbar({
            type: 'error',
            message
        });
        return;
    }
}
$passwordForm.addEventListener('submit', updatePassword);

//Chức năng xóa tài khoản

const $accountDeleteBtn = document.querySelector('[data-account-delete]');


const deleteAccount = async () => {


    const confirmDelete =  confirm('Are you sure you want to delete your account?');
    if(!confirmDelete){
        return;
    }
    $accountDeleteBtn.setAttribute('disabled', '');

    $progressBar.classList.add('loading');

    const response = await fetch(`${window.location.href}/account`, {
        method: 'DELETE'
    });

    if(response.ok){
        $progressBar.classList.add('loading');
        window.location = `${window.location.origin}/`;
    }
}
$accountDeleteBtn.addEventListener('click', deleteAccount);




