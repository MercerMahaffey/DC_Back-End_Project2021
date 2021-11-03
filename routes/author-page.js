const express = require('express');
const router = express.Router();

router.get('/author-page', (req,res) => {

   
    res.render('author-page')
})


module.exports = router;