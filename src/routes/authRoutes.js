const express = require('express');
const router = express.Router();
const { DUMMY_USER } = require('../config/constants');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/login', (req, res) => {
    console.log('GET /login request received');
    res.send(`
        <h1>Login</h1>
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Login</button>
        </form>
    `);
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
        req.session.user = { username: DUMMY_USER.username };
        return res.send('Login Successful');
    } else {
        return res.send('Invalid Credentials');
    }
});

router.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`Welcome to the Dashboard, ${req.session.user.username}!`);
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.clearCookie('connect.sid');
        res.send('Logged out successfully');
    });
});

module.exports = router;