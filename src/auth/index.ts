import { Router } from 'express';
import register from './register.js';
import login from './login.js';
import refreshToken from './refreshToken.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
export default router;
