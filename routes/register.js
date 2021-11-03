const express = require('express');
const router = express.Router();


const bcrypt = require('bcryptjs');
const db = require('../models');


router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    try{
        
        let {username, email, password} = req.body;

        password = bcrypt.hashSync(password, 8);
        
        await db.users.create({
            username,
            email, 
            password, 
            roleName: 'Basic',
            languages: null,
            github: null
        })

        res.redirect('/login')
    }
    catch(err){
        res.render('registration', {
            err
        })
    }
})


module.exports = router;