import { Router } from 'express';
import superAdminRoutes from '../module/superAdmins/superAdminRoutes';

const router: Router = Router();

// Super Admin Routes
router.use('/superAdmin', superAdminRoutes);

// Company Owner Routes

// Team Member Routes

// Team Manager Routes

export default router;