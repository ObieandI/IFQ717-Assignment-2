import express from 'express';
import { register } from '../../controllers/users/PostRegisterController.js';

const router = express.Router();

/**
 * @route POST /users/register
 * @description Register a new user
 * @access Public
 */
router.post('/register', register);

export default router;
