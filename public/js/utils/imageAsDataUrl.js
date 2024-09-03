'use strict';


/**
 * Chuyển đổi một 'image blob' thành một URL dữ liệu
 * 
 * @param {Blob} imageBlob
 * @return {Promise<string>}
 */

const imageAsDataURL = (imageBlob) =>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageBlob);


    return new Promise((resolve, reject) => {
        fileReader.addEventListener('load', () =>{
            resolve(fileReader.result);
            // console.log(fileReader.result)
        })
        fileReader.addEventListener('error', () =>{
            reject(fileReader.error);
        });
    });
    
}
export default imageAsDataURL;
