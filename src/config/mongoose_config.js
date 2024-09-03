'use strict';

const mongoose = require('mongoose');

/**
 * @type {ClientOptions}
 */

const clientOptions = {
    serverApi:{
        version: '1',
        strict: true,
        deprecationErrors: true,
    },
    dbName: 'MyBlogPage'
}

/** KẾT NỐI TỚI MONGOOSE DB BẰNG CHUỖI KẾT NỐI CƠ SỞ DỮ LIỆU ĐÃ ĐƯỢC CUNG CẤP
 * @param {string} connectionStr
 * @returns {Promise<void>}
 * @throws {Error}
 */

const connectDB = async (connectionURI) =>{
    try{
        await mongoose.connect(connectionURI, clientOptions);
        console.log('Connected to MongoDB');
    } catch(e){
        console.log('Error connecting to MongoDB',e.message);
        throw e;
    }
}

/**Ngắt kết nối khỏi cơ sở dữ liệu của MongooseDB bằng Mongoose
 * @async
 * @function disconnectDB
 * @throws {Error}
 * @returns {Promise<void>}
 */

const disconnectDB = async ()=>{
    try{
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch(e){
        console.log('Error disconnecting from MongoDB',e.message);
        throw e;
    }
}

module.exports = {
    connectDB,
    disconnectDB,
}