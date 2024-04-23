import { Router } from 'express';
import listUsers from './listUsers.js';

const router = Router();
router.get('/users', listUsers);
export default router;
