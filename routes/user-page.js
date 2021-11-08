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
    
    console.log("*** inside user_posts on backend ***");
    
    // using formidable to grab encrypted data from the form
    const form = new formidable.IncomingForm();
    
    // gives filepath to house temp image file
    let uploadFolder = path.join(__dirname, "../public", "files")
    form.uploadDir = uploadFolder
    form.parse(req, (err, fields, files) => {
        if(err){
            console.log(`An error has occurred: ${err}`);
            next()
            return
        }
        console.log(`title: ${fields.title}`);
        console.log(`content: ${fields.content}`);
        // upload image to cloudinary and create post entry in db
        // todo if() make if statement so cloudinary code doesn't run when no photo is on post
        try{
            cloudinary.uploader.upload(files.upload.filepath, async (err, result) => {
                if(err){
                    console.log(`An error has occurred: ${err}`);
                    next()
                }
                console.log(`result: ${result}`);
                console.log(`result.secure_url: ${result.secure_url}`);
                if(fields.content){
                    await db.posts.create({title: fields.title, content: fields.content, languages: "javascript", userid: 1, imgurl: result.secure_url})
                    res.redirect("/")
                }
                else{
                    console.log("The post content is empty or null and the post was not created.");
                }
            })
        }
        catch(err){
            console.log(`catch error: ${err}`);
        }

        // deletes temp image file in files folder
        fs.unlinkSync(files.upload.filepath)
        console.log(req.session.passport.user)
    })
    
    // // grab title, content, languages, userid, imgurl from body parser
    // let {title, content, languages, userid, imgurl} = req.body

    // if (content){
        
    // await db.posts.create({title: title, content: content, languages: "javascript", userid: 1, imgurl: imgurl})
    // }

    
    // // grab users posts from database sorted latest first
    // let userPosts = await db.posts.findAll({
    //     where: {userid: 1}, 
    //     order: [
    //         ["id", "DESC"]
    //     ]}) // returns an array of objects
    // res.json(userPosts)
})

module.exports = router;