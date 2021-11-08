const express = require('express');
const router = express.Router();

const db = require('../models');
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

router.get('/account-information', auth, async (req, res) => {
    let userid = req.session.passport.user;

    let user = await db.users.findByPk(userid);
    let userRecords = await user.dataValues;
    console.log(userRecords);
    res.render('account-information', {
        userRecords
    })
})

router.get('/username', async (req, res) => {
    
    let userRecords = await db.users.findAll()
    res.json(userRecords)
})

router.put('/update-account', async (req, res) => {
    let userid = req.session.passport.user;
    
    console.log(userid, req.body);
    let content = req.body

    
    await db.users.update(content, {where: {id: userid}});
    
    res.json('need this to work')
})

router.post("/update-account", (req, res) => {
    let userid = req.session.passport.user;
    console.log(`userid = ${userid}`);
    console.log("*** inside update-account post route on backend ***")
    
    // using formidable to grab encrypted data from the form
    const form = new formidable.IncomingForm();
    
    // gives filepath to house temp image file
    let uploadFolder = path.join(__dirname, "../public", "files")
    form.uploadDir = uploadFolder
    form.parse(req, (err, fields, files) => {
        if(err){
            console.log(`An error has occurred: ${err}`);
            next()
        }
        console.log(files);
        // upload image to cloudinary and create post entry in db
        cloudinary.uploader.upload(files.upload.filepath, async (err, result) => {
            if(err){
                console.log(`An error has occurred: ${err}`);
                next()
            }
            console.log(`result: ${result}`);
            console.log(`result.secure_url: ${result.secure_url}`);
            await db.users.update({userimage: result.secure_url}, {where: {id: userid}})
            let response = await db.users.findByPk(userid)
            console.log(response);
            res.redirect("/account-information")
        })
        // deletes temp image file in files folder
        fs.unlinkSync(files.upload.filepath)
    })
})

module.exports = router;