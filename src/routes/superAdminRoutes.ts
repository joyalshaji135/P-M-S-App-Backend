import { Router } from 'express';
import superAdminRoutes from '@modules/master-manage-modules/super-admins/super-admins.route';
import authOrganizationRoutes from '@modules/auth-organization/auth-organization-login.route';
import lookupRoutes from '@modules/lookups-modules/lookup-code/lookup-code.route';
import customerTypeRoutes from '@modules/lookups-modules/customer-type/customer-type.route';
import companyOwnersRoutes from '@modules/master-manage-modules/company-owners/company-owners.route';
import teamManagerRoutes from '@modules/master-manage-modules/team-managers/team-managers.route';
import teamMemberRoutes from '@modules/master-manage-modules/team-members/team-members.route';
import industryProjectRoutes from '@modules/master-workspace-modules/industry-projects/industry-projects.route';
import taskRolesRoutes from '@modules/master-workspace-modules/task-roles/task-roles.route';
// import workspaceRoutes from '@modules/master-workspace-modules/workspaces/workspaces.route';
import todoListsRoutes from '@modules/master-workspace-modules/todo-lists/todo-lists.route';
import verifyTokenMiddleware from '@middleware/verifyToken';
import { requireApiKey, requireAuthToken } from '@middleware/apiRequest';
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

router.use('/lookups', lookupRoutes);

// Create Customer Type Routes

router.use('/customer-types', customerTypeRoutes);

// Company Owner Routes

router.use('/company-owners', companyOwnersRoutes);

// Team Manager Routes

router.use('/team-managers', teamManagerRoutes);

// Team Member Routes

router.use('/team-members', teamMemberRoutes);

// Projects Routes

router.use('/industry-projects', industryProjectRoutes);

// Tasks Routes

router.use('/task-roles', taskRolesRoutes);

// WorkSpaces Routes

// router.use('/workspaces', workspaceRoutes);

// Todos Routes

router.use('/todo-lists', todoListsRoutes);

// Feedback Routes

// router.use('/feedback', feedbackRoutes);

export default router;
