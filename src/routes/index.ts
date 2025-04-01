import { Router } from 'express';
import superAdminRoutes from './superAdminRoutes';
import companyOwnerRoutes from './companyOwnerRoutes';
import teamManagerRoutes from './teamManagersRoutes';
import teamMemberRoutes from './teamMembersRoutes';
const router: Router = Router();

// Super Admin Routes
router.use('/super-admin', superAdminRoutes);

// Company Owner Routes

router.use('/company-owner', companyOwnerRoutes);

// Team Member Routes

router.use('/team-manager', teamManagerRoutes);

// Team Manager Routes

router.use('/team-member', teamMemberRoutes);

export default router;
