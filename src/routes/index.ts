import { Router } from 'express';
import superAdminRoutes from './superAdminRoutes';
import companyOwnerRoutes from './companyOwnerRoutes';

const router: Router = Router();

// Super Admin Routes
router.use('/super-admin', superAdminRoutes);

// Company Owner Routes

router.use('/company-owner', companyOwnerRoutes);

// Team Member Routes



// Team Manager Routes

export default router;
