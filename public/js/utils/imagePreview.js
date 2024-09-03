'use strict';

/**
 * Tạo một phần ảnh xem trước từ file ảnh được chọn và hiển thị nó 
 * trong một container(giao diện) nhất định
 * @param {HTMLInputElement} $imageField
 * @param {HTMLElement} $imagePreview
 * @returns {Promise<string>}
 */

const imagePreview = async function($imageField, $imagePreview) {
    // console.log($imageField.files)
    const imageObjectUrl = URL.createObjectURL($imageField.files[0]);
    // console.log(imageObjectUrl)


    const $image = document.createElement('img');
    $image.classList.add('img-cover');
    $image.src = imageObjectUrl;

    $imagePreview.append($image);
    $imagePreview.classList.add('show');

    return imageObjectUrl;
}

export default imagePreview;