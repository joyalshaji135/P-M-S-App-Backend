import { Router } from 'express';
import superAdminRoutes from '../module/superAdmins/createSuperAdmins/superAdminRoutes';
import authSuperAdminLoginRoutes from '../module/superAdmins/authSuperAdminLogin/authSuperAdminLoginRoutes';
import verifyTokenMiddleware from '../middleware/verifyToken';
import { requireApiKey, requireAuthToken } from '../middleware/apiRequest';
const router: Router = Router();

router.use(requireApiKey);

// Super Admin Login Routes

router.use('/auth-super-admin', authSuperAdminLoginRoutes);

router.use(requireAuthToken);

// Middleware
router.use(verifyTokenMiddleware);

// Super Admin Creating Functionality Routes

router.use('/super-admin-module', superAdminRoutes);

// Company Owner Routes

// Team Member Routes

// Team Manager Routes

export default router;

// Auth

// Team Members

// Team Managers

// Company Owners

// Projects

// Tasks

// WorkSpaces
