const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())



app.get('/', (req,res) => {
    res.render('index')
})






app.listen(port, () => {
    console.log(`On port ${port}`);
})
