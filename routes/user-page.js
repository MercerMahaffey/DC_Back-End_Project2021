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


module.exports = router;