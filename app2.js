const express = require('express');
// const gatekeeper = require("") require and make gatekeeper?
const app = express();
// const db = require('../models');
require("dotenv").config()
const formidable = require("formidable")
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require('fs');

const port = 3010;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Routes
app.use(require('./routes/routeTest.js'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})