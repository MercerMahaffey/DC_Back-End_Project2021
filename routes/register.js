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
            languages: "",
            github: "",
            userimage: "https://res.cloudinary.com/dc-backend-project2021/image/upload/v1636327951/genericUser_gpcbds.png",
            darkMode: false
        })

        res.redirect('/login')
    }
    catch(err){
        res.render('register', {
            err
        })
    }
})


module.exports = router;