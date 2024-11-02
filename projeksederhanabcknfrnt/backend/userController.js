// backend/controllers/userController.js
const express = require('express');
const fs = require('fs');
const router = express.Router();

const usersFile = './data/users.json';

// Helper untuk membaca dan menulis data pengguna
function readUsers() {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Endpoint register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    users.push({ username, password });
    writeUsers(users);
    res.status(201).json({ message: 'User registered successfully' });
});

// Endpoint login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(400).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;
