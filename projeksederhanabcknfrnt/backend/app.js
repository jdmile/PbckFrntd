// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/user', userController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
