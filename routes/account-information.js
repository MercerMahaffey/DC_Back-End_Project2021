const express = require('express');
const router = express.Router();

const db = require('../models');
const auth = require('../auth/index');

router.get('/account-information', auth, (req, res) => {
    res.render('account-information')
})
router.get('/username', (req, res) => {
    let userid = req.session.passport.user;

    let user = db.users.findByPk(userid);
    res.json(user)
})

module.exports = router;