const express = require('express');
const session = require('express-session');
const { SESSION_SECRET } = require('./config/constants');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        maxAge: 1000 * 60 * 60
    }
}));


app.use('/', authRoutes);

module.exports = app;