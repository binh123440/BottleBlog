'use strict';


import Snackbar from "./snackbar.js";

const $form = document.querySelector('[data-form]')
const $submitBtn = document.querySelector('[data-submit-btn]')


$form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData($form);

    if (formData.get('password') !== formData.get('confirm-password')) {
        $submitBtn.removeAttribute('disabled');
        Snackbar({
            message: 'Password and confirm password do not match',
            type: 'error'
        })
        return;
    }

    const body = new URLSearchParams(Object.fromEntries(formData.entries())).toString();
    console.log(body);
    const response = await fetch(`${window.location.origin}/register`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(Object.fromEntries(formData.entries())).toString()
    });
    
    if(response.ok){
     return window.location = response.url;       
    }

    if(response.status === 400){
        const {message} = await response.json();
        Snackbar({
            type: 'error',
            message: message
        })
    }
});
