const express = require('express');
const router = express.Router();

router.get('/account-information', (req,res) => {

   
    res.render('account-information')
})


module.exports = router;