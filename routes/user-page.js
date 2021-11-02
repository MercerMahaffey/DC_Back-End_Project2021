const express = require('express');
const router = express.Router();

router.get('/user-page', (req,res) => {

   
    res.render('user-page')
})


module.exports = router;