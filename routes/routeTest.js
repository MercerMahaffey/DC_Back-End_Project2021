const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../models');
const formidable = require("formidable")
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

router.get('/upload', (req,res) => {
    
    res.send(`
    <form action="/upload" enctype="multipart/form-data" method="post">
        <input type="text" name="title" /><br/>
        <input type="text" name="content" /><br/>
        <input type="file" name="upload" multiple="multiple" /><br/>
        <input type="submit" value="Upload" />
    </form>
    `)
})

router.post("/upload", (req, res, next) => {
    const form = new formidable.IncomingForm();
    let uploadFolder = path.join(__dirname, "../public", "files")
    form.uploadDir = uploadFolder
    form.parse(req, (err, fields, files) => {
        if(err){
            console.log(`An error has occurred: ${err}`);
            next()
            return
        }
        cloudinary.uploader.upload(files.upload.filepath, async (error, result) => {
            await db.posts.create({title: fields.title, content: fields.content, languages: "javascript", userid: 1, imgurl: result.secure_url})
        })
        fs.unlinkSync(files.upload.filepath) // deletes temp file in files folder
    })
    
})

module.exports = router;