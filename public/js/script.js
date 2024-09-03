'use strict';

const $topAppBar = document.querySelector('[data-top-app-bar]')
let lastScrollPos = 0

window.addEventListener('scroll', (event) => {
    $topAppBar.classList[window.scrollY > 50 ? 'add' : 'remove']('active')

    $topAppBar.classList[window.scrollY > lastScrollPos && window.scrollY > 50 ? 'add' : 'remove']('hide');
    lastScrollPos = window.scrollY;
});

const $menuWrapper = document.querySelectorAll('[data-menu-wrapper]');

$menuWrapper?.forEach(function($menuWrapper){
    const $menuToggler = $menuWrapper.querySelector('[data-menu-toggler]');
    const $menu = $menuWrapper.querySelector('[data-menu]');

    $menuToggler.addEventListener('click', () => {
        $menu.classList.toggle('active');
    })
})

const $backBtn = document.querySelector('[data-back-btn]');
const handleBackward = function(){
    window.history.back();
}
$backBtn.addEventListener('click', handleBackward);


const $autoHeightTextarea = document.querySelector('[data-textarea-auto-height]');

const textareaAutoHeight = function() {
    this.style.height = this.scrollHeight + 'px';
    this.style.maxHeight = this.scrollHeight + 'px';
}
$autoHeightTextarea?.addEventListener('input', textareaAutoHeight);

//set initial textarea height
$autoHeightTextarea && textareaAutoHeight.call($autoHeightTextarea)
