const express = require('express');
const app = express();
const helmet = require('helmet');
const port = 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Routes
app.use(require('./routes/index.js'))
app.use(require('./routes/404.js'))
app.use(require('./routes/account-information.js'))
app.use(require('./routes/login.js'))
app.use(require('./routes/register.js'))
app.use(require('./routes/user-page.js'))




app.listen(port, () => {
    console.log(`On port ${port}`);
})
