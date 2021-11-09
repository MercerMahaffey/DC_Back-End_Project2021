//user-page.js in routes

const express = require('express');
const router = express.Router();
const db = require('../models')
const auth = require('../auth/index');
const formidable = require("formidable")
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

let grabPosts = async (userid) => {
    let postRecords = await db.users.findAll(
        {
        where: {id: userid},
        include: [{
            model:db.posts,
            required: true,
            include: [{
                model: db.comments,
                required: false,
                }]
            }],
            order: [
                [{model: db.posts}, "id", "DESC"]
            ]
        }
    )
    console.log(postRecords);
    return postRecords;
}

router.get('/user-page', auth, async (req, res) => {
    let userid = req.session.passport.user;

    let user = await db.users.findByPk(userid);
    let userRecords = await user.dataValues;
    console.log(userRecords);
    res.render('user-page', {
        userRecords
    })
})

router.get('/users', async (req, res) => {
    let users = await db.users.findAll()

    res.json(users)
})

router.get("/user_posts", async (req, res) => {
    let userid = req.session.passport.user;
    let postRecords = await grabPosts(userid);

    // first array is user, second array is post of that user
    // let languagesArray = postRecords[0].posts[0].languages.split(',');

    // console.log(languagesArray);
    res.set("Content-Security-Policy", "default-src 'self'; img-src *'");
    res.json(postRecords);
})

router.post("/user_posts", (req, res, next) => {
    let userid = req.session.passport.user;
    
    // using formidable to grab encrypted data from the form
    const form = new formidable.IncomingForm();
    
    // gives filepath to house temp image file
    let uploadFolder = path.join(__dirname, "../public", "files")
    form.uploadDir = uploadFolder
    form.parse(req, async (err, fields, files) => {
        if(err){
            next()
            return
        }
        // upload image to cloudinary and create post entry in db
        if(files.upload.size !== 0){
            await cloudinary.uploader.upload(files.upload.filepath, async (err, result) => {
                // console.log(`imgurl: ${result.secure_url}`);
                if(err){
                    console.log(`An error has occurred inside of cloudinary: ${err}`);
                    // next()
                    return
                }
                let languages = '';
                if(fields.javascript){
                    languages += "javascript, "
                }
                if(fields.html){
                    languages += "html, "
                }
                if(fields.css){
                    languages += "css, "
                }
                if(languages == ''){
                    languages = 'english, '
                }
                languages = languages.substring(0, languages.length-2)
                await db.posts.create({title: fields.title, content: fields.content, languages: languages, userid: userid, imgurl: result.secure_url})
                
                res.redirect("/user-page")
            })
            // deletes temp image file in files folder
            fs.unlinkSync(files.upload.filepath)
        }
        else if(fields.content !== ""){
            let languages = '';
            if(fields.javascript){
                languages += "javascript, "
            }
            if(fields.html){
                languages += "html, "
            }
            if(fields.css){
                languages += "css, "
            }
            if(languages == ''){
                languages = ''
            }
            languages = languages.substring(0, languages.length-2)
            await db.posts.create({title: fields.title, content: fields.content, languages: languages, userid: userid, imgurl: ""})
            fs.unlinkSync(files.upload.filepath)
            res.redirect("/user-page")
        }
        else{
            fs.unlinkSync(files.upload.filepath)
            res.redirect("/user-page")
        }
    })
})

module.exports = router;