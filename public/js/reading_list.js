'use strict';



import dialog from './dialog.js';

const $readingListBtn = document.querySelector('[data-reading-list-btn]');
const $readingListNumber = document.querySelector('[data-reading-list-number]')




const addToReadingList = async () => {

    try{
        const response = await fetch(`${window.location}/readingList`,{
            method: 'PUT',
        });
        if(response.ok){
            $readingListBtn.classList.add('active');
            $readingListNumber.textContent = Number($readingListNumber.textContent) + 1;
        }
        if(response.status === 401) {const $dialog = dialog({
            title: 'Please login',
            content: 'You need to login to perform this action',
        })

        document.body.appendChild($dialog);
    };

    }catch(e){
        console.error('Error while bookmarking blog',e.message);
        
    }

}


/**
 * Xóa một reaction khỏi blog
 * bằng cách gửi một request 'DELETE'
 * Cập nhật giao diện giựa theo phản hồi của server
 * 
 * @function removeFromReadingList
 * @throws {Error}
 */
const removeFromReadingList = async () =>{
    try{

        const response = await fetch(`${window.location}/readingList`,{
            method: 'DELETE',
        });
        if(response.ok){
            $readingListBtn.classList.remove('active');
            $readingListNumber.textContent = Number($readingListNumber.textContent) - 1;
        }
        if(response.status === 401) {const $dialog = dialog({
            title: 'Please login',
            content: 'You need to login to perform this action',
        })

        document.body.appendChild($dialog);
    };

    } catch(e){
        console.error('Error while removing from reading list',e.message);
        
    }
}

$readingListBtn.addEventListener('click', async function(){
    
    $readingListBtn.setAttribute('disabled', '');

    if(!$readingListBtn.classList.contains('active')){
        await addToReadingList();
    }else{
        await removeFromReadingList();
    }
    
    $readingListBtn.removeAttribute('disabled');

});