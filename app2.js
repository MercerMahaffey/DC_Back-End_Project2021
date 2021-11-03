const express = require('express');
const app = express();
const fileupload = require("express-fileupload")
require("dotenv").config()
const cloudinary = require("cloudinary").v2
const port = process.env.PORT;

app.use(fileupload())

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


app.get('/', (req,res) => {
    res.render('index')
})

app.get('/upload', (req,res) => {
    res.send("Hello world")
})

app.post("/upload", (req, res) => {
    // const file = req.files.photo
    console.log(files);
})



app.listen(port, () => {
    console.log(`On port ${port}`);
})