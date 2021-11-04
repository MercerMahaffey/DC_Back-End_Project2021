//user-page.js in routes

const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/user-page', (req, res) => {
    res.render('user-page')
})

router.get('/users', async (req, res) => {
    let users = await db.users.findAll()

    res.json(users)
})

router.post("/user_posts", async (req, res) => {
    // grab title, content, languages, userid, imgurl from body parser
    let {title, content, languages, userid, imgurl} = req.body
    await db.posts.create({title: title, content: content, languages: "javascript", userid: 1, imgurl: imgurl})
    
    // grab users posts from database sorted latest first
    let userPosts = await db.posts.findAll({
        where: {userid: 1}, 
        order: [
            ["id", "DESC"]
        ]}) // returns an array of objects
    res.json(userPosts)
})


module.exports = router;