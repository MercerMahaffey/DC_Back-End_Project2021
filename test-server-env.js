
const express = require("express")
const app = express()
require("dotenv").config()

const port = process.env.PORT

app.get("/", (req, res) => {
    res.send("test page")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

