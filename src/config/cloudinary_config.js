'use strict';


// Require the cloudinary library (yêu cầu thu viện cloudinary)
const cloudinary = require('cloudinary').v2;

/**
 * Tinh chỉnh cài đạt của Cloudinary cho việc upload hình ảnh
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

/**
 * UPLOAD HÌNH ẢNH DƯỚI ĐINH DẠNG base64 lên cloudinary
 * @param {string} image 
 * @param {string} public_id
 * @returns {Promise<string>} 
 * @throws {Error}
 */

const uploadToCloudinary = async (image, public_id) =>{
    try{
        const response = await cloudinary.uploader.upload(image, {
            resource_type: 'auto',
            public_id
        })
        return response.secure_url;  // Trả về URL của hình ảnh đã upload lên cloudinary
    }catch(e){
        console.error('Error when uploading image to cloudinary', e);
        throw e;
    }
}

module.exports = uploadToCloudinary;
