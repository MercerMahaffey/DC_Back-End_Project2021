const express = require('express');
const app = express();
require("dotenv").config()

const port = 3010;

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req,res) => {
    res.render('test')
})

app.get('/upload', (req,res) => {
    res.send("Hello world")
})

app.post("/upload", (req, res) => {
    form.parse(req, (err, fields, files))
    console.log(req.files)
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})