import express from 'express';

const router = express.Router();
import { registerUser, loginUser } from '../controllers/userController.js';

// @route POST /users
// @access UNACCESSIBLE
router.post('/', registerUser);

// @route POST /users/login
// @access ACCESSIBLE
router.post('/login', loginUser);

export default router;