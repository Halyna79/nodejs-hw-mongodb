import { Router } from 'express';
import authRoutes from './auth.js';
import contactRoutes from './contacts.routers.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);

export default router;