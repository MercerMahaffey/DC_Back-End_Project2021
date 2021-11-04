const express = require('express');
const router = express.Router();
const passport = require('passport');


const cookieSession = require('cookie-session');


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))




module.exports = router;