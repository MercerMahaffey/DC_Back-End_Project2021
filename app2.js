const express = require('express');
const app = express();
require("dotenv").config()
const cloudinary = require("cloudinary").v2

const port = process.env.PORT;

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
})

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