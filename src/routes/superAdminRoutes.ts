import { Router } from 'express';
import superAdminRoutes from '../module/superAdmins/createSuperAdmins/superAdminRoutes';
import authSuperAdminLoginRoutes from '../module/superAdmins/authSuperAdminLogin/authSuperAdminLoginRoutes';
import lookupRoutes from '../module/lookups/lookup-code/lookup-code.route';
import customerTypeRoutes from '../module/lookups/customer-type/customer-type.route';
import companyOwnerRoutes from '../module/superAdmins/createCompanyOwner/companyOwnerRoutes';
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

// Create Lookups Routes

router.use('/lookups', lookupRoutes);

// Create Customer Type Routes

router.use('/customer-types', customerTypeRoutes);

// Company Owner Routes

router.use('/company-owners', companyOwnerRoutes);

// Team Member Routes

// router.use('/team-members', teamMemberRoutes);

// Team Manager Routes

// router.use('/team-managers', teamManagerRoutes);

// Projects Routes

// router.use('/projects', projectRoutes);

// Tasks Routes

// router.use('/tasks', taskRoutes);

// WorkSpaces Routes

// router.use('/workspaces', workspaceRoutes);

// Todos Routes

// router.use('/todos', todoRoutes);

// Feedback Routes

// router.use('/feedback', feedbackRoutes);

export default router;
