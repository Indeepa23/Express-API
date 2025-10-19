import { register, login, getAllUsers } from '../controllers/userController.js'
import auth from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/loggin', login)
router.get('/', auth, getAllUsers)

export default router;