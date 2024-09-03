'use strict';


const express = require('express');
const app = express();
require('dotenv').config()
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcryptjs = require('bcryptjs');

const register = require('./src/routes/register_route');
const login = require('./src/routes/login_route');
const home = require('./src/routes/home_route');
const createBlog = require('./src/routes/create_blog_route');
const logout = require('./src/routes/logout_route');
const userAuth = require('./src/middlewares/user_auth_middleware');
const blogDetail = require('./src/routes/blog_detail_route');
const readingList = require('./src/routes/reading_list_route');
const blogUpdate = require('./src/routes/blog_update_route');
const profile = require('./src/routes/profile_route');
const dashboard = require('./src/routes/dashboard_route');
const deleteBlog = require('./src/routes/blog_delete_route');
const settings = require('./src/routes/settings_route');

const {connectDB, disconnectDB} = require('./src/config/mongoose_config');

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '10mb'}))

const store = new MongoStore({
    mongoUrl: process.env.MONGO_CONNECTION_URI,
    collectionName: 'sessions',
    dbName: 'MyBlogPage'
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: Number(process.env.SESSION_MAX_AGE),
    },
}))
 


app.use('/register', register);
app.use('/login',login);
app.use('/logout', logout);
app.use('/',home);
app.use('/blogs', blogDetail);
app.use('/profile', profile)
app.use(userAuth)
app.use('/createblog',createBlog);
app.use('/readingList', readingList);
app.use('/blogs', blogUpdate, deleteBlog);
app.use('/dashboard', dashboard);
app.use('/settings', settings);

const PORT = process.env.PORT || 4000
const server = app.listen(PORT, async ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    await connectDB(process.env.MONGO_CONNECTION_URI);
});

server.on('close', async ()=> await disconnectDB())