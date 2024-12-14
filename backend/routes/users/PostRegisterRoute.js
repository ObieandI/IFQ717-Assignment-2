const express = require('express');
const { register } = require('../../controllers/users/PostRegisterController');

const router = express.Router();

/**
 * @route POST /users/register
 * @description Register a new user
 * @access Public
 */
router.post('/register', register);

module.exports = router;