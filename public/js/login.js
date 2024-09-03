'use strict';


import Snackbar from "./snackbar.js";

const $form = document.querySelector('[data-form]')
const $submitBtn = document.querySelector('[data-submit-btn]')


$form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData($form);

    // console.log(body);
    const response = await fetch(`${window.location.origin}/login`, {
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
