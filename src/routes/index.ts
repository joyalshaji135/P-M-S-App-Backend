import { Router } from 'express';
import superAdminRoutes from './superAdminRoutes';

const router: Router = Router();

// Super Admin Routes
router.use('/super-admin', superAdminRoutes);

// Company Owner Routes

// Team Member Routes

// Team Manager Routes

export default router;
