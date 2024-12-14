const express = require('express');
const { login } = require('../../controllers/users/PostLoginController');

const router = express.Router();

// Define the POST /users/login route
router.post('/login', login);

module.exports = router;