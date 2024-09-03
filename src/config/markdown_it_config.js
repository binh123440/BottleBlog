'use strict';

const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');

const markdown = new MarkdownIt({

    //Chuyển đổi ký tự '\n' trong văn bản thành thẻ <br>
    breaks: true,
    // tự động chuyển đổi nhũng dòng text có định dạng URL thành link
    linkify: true,

    highlight: (str, lang) =>{
        if(!lang && !hljs.getLanguage(lang)) return '';
        try {
            return hljs.highlight(str, {
                language: lang,
                ignoreIllegals: true,
            }).value;
        }catch(e) {
            console.log('Error hightlighting language', e);
            return e;
        }
    } 
});
module.exports = markdown