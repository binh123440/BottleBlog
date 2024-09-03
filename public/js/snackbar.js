'use strict';

const $snackbarWrapper = document.querySelector('[data-snackbar-wrapper]')
let lastTimeout = null;

/**
 * tạo một component snackbar và hiển thị nó với những mục cụ thể
 * 
 * @param {Object} props - Thuộc tính cho snackbar
 * @param {string} props.message
 * @param {string} [props.type]
 */

const Snackbar = (props) => {
    const $snackbar = document.createElement('div');
    $snackbar.classList.add('snackbar');
    props.type && $snackbar.classList.add(props.type);
    $snackbar.innerHTML = `
        <p class="body-medium snackbar-text">
            ${props.message}
        </p>
    `;

    $snackbarWrapper.innerHTML = '';
    $snackbarWrapper.append($snackbar);

    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(() => {
        $snackbarWrapper.removeChild($snackbar);
    }, 7000)
}

export default Snackbar;