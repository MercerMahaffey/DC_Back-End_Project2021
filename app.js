const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./auth/passport-config')(passport);
const port = 3000;
require("dotenv").config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.use(helmet());


app.use(cookieSession({
    name: 'session',
    keys: ['wuivpmspodsmfvablgkdlsfjgnogpewmyrcs'],
    maxAge: 14*24*60*60*1000
}))

app.use(passport.initialize());
app.use(passport.session());


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
