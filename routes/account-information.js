const express = require('express');
const router = express.Router();

const db = require('../models');
const auth = require('../auth/index');

router.get('/account-information', auth, (req, res) => {
    res.render('account-information')
})
router.get('/username', async (req, res) => {
    
    let userRecords = await db.users.findAll()
    res.json(userRecords)
})

module.exports = router;