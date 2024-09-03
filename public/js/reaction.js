'use strict';

import dialog from './dialog.js';


const $reactionBtn = document.querySelector('[data-reaction-btn]');
const $reactionNumber = document.querySelector('[data-reaction-number]');


/**
 * Thêm tính năng reaction cho blogs
 * Chức năng này gửi một 'PUT' request tơí endpoint reactions để có thể add một reaction
 * nếu phản hồi là thành công (code 200), nó sẽ kích hoạt nút reaction
 * và tăng số lương reaction được hiển thị trên màn hình
 * nếu phản hồi là 401 (chưa được xác thực), nó sẽ hướng người dùng đến trang đăng nhập
 * 
 * @function addReaction
 * @throws {Error} 
 */
const addReaction = async () =>{
    try{
        const response = await fetch(`${window.location}/reactions`,{
            method: 'PUT',
        });
        if(response.ok){
           $reactionBtn.classList.add('active', 'reaction-anim-add');
           $reactionBtn.classList.remove('reaction-anim-remove');
            $reactionNumber.textContent = Number($reactionNumber.textContent) + 1;
        }
        if(response.status === 401) {
            const $dialog = dialog({
                title: 'Please login',
                content: 'You need to login to perform this action',
            })

            document.body.appendChild($dialog);
        };

    }catch(e){
        console.error('Error while reacting to blog',e.message);
        
    }
}

/**
 * Xóa một reaction khỏi blog
 * bằng cách gửi một request 'DELETE'
 * Cập nhật giao diện giựa theo phản hồi của server
 * 
 * @function removeReaction
 * @throws {Error}
 */
const removeReaction = async () =>{
    try{

        const response = await fetch(`${window.location}/reactions`,{
            method: 'DELETE',
        });
        if(response.ok){
            $reactionBtn.classList.add('reaction-anim-remove');
            $reactionBtn.classList.remove('active', 'reaction-anim-add');
            $reactionNumber.textContent = Number($reactionNumber.textContent) - 1;
        }
        if(response.status === 401) {
            const $dialog = dialog({
                title: 'Please login',
                content: 'You need to login to perform this action',
            })

            document.body.appendChild($dialog);
        };

    } catch(e){
        console.error('Error while removing reaction to blog',e.message);
        
    }
}

$reactionBtn.addEventListener('click', async function(){
    
    $reactionBtn.setAttribute('disabled', '');

    if(!$reactionBtn.classList.contains('active')){
        await addReaction();
    }else{
        await removeReaction();
    }
    
    $reactionBtn.removeAttribute('disabled');

});


