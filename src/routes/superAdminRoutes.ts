import { Router } from 'express';
import superAdminRoutes from '../module/master-manage-modules/super-admins/super-admins.route';
import authOrganizationRoutes from '../module/auth-organization/auth-organization-login.route';
import lookupRoutes from '../module/lookups-modules/lookup-code/lookup-code.route';
import customerTypeRoutes from '../module/lookups-modules/customer-type/customer-type.route';
import companyOwnersRoutes from '../module/master-manage-modules/company-owners/company-owners.route';
import verifyTokenMiddleware from '../middleware/verifyToken';
import { requireApiKey, requireAuthToken } from '../middleware/apiRequest';
const router: Router = Router();

router.use(requireApiKey);

// Super Admin Login Routes

router.use('/auth-super-admin', authOrganizationRoutes);


router.use(requireAuthToken);

// Middleware
router.use(verifyTokenMiddleware);

// Super Admin Creating Functionality Routes

router.use('/super-admin-module', superAdminRoutes);

// Create Lookups Routes

// router.use('/lookups', lookupRoutes);

// Create Customer Type Routes

// router.use('/customer-types', customerTypeRoutes);

// Company Owner Routes

router.use('/company-owners', companyOwnersRoutes);

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
