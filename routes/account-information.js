const express = require('express');
const router = express.Router();

const db = require('../models');
const auth = require('../auth/index');

router.get('/account-information', auth, async (req, res) => {
    let userid = req.session.passport.user;
    let userRecordsRaw = await db.users.findOne({
        where: {
          id: userid 
        },
      })
    let userRecords = userRecordsRaw.dataValues;
    
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

module.exports = router;