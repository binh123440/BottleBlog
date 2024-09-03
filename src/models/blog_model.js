'use strict';

// const express = require('express');
const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    banner: {
        url:{
            type: String,
            required: true
        },
        public_id: {
            type:String,
            require: true,
        }
    },
    title: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reaction:{
        type: Number,
        default: 0,
    },
    readingTime:{
        type: Number,
        default: 0,
    },
    totalBookmark:{
        type: Number,
        default: 0,
    },
    totalVisit:{
        type: Number,
        default: 0,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);