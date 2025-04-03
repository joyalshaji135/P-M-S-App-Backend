import { Router } from 'express';
import superAdminRoutes from '@modules/master-manage-modules/super-admins/super-admins.route';
import authOrganizationRoutes from '@modules/auth-organization/auth-organization-login.route';
import customerTypeRoutes from '@modules/lookups-modules/customer-type/customer-type.route';
import companyOwnersRoutes from '@modules/master-manage-modules/company-owners/company-owners.route';
import teamManagerRoutes from '@modules/master-manage-modules/team-managers/team-managers.route';
import teamMemberRoutes from '@modules/master-manage-modules/team-members/team-members.route';
import todoListsRoutes from '@modules/master-workspace-modules/todo-lists/todo-lists.route';
import alertModesRoutes from '@modules/master-workspace-modules/alert-modes/alert-modes.route';
import clientFeedbacksRoutes from '@modules/master-workspace-modules/clients-feedbacks/clients-feedbacks.route';
import documentFileRoutes from '@modules/feature-manage-modules/document-files/document-files.route';
import eventProgramRoutes from '@modules/feature-manage-modules/event-programs/event-programs.route';
import googleMeetRoutes from '@modules/feature-manage-modules/google-meets/google-meets.route';
import recruitmentPostsRoutes from '@modules/feature-manage-modules/recruitment-posts/recruitment-posts.route';
import lookupCodeRoutes from '@modules/lookups-modules/lookupsRoutes';
import lookupModuleRoute from '@modules/lookups-modules/lookupsRoutes';
// import commonDropDownRoutes from '@modules/common-drop-downs/common-drop-downs.route';
import commonDropDownRoutes from '@modules/common-drop-downs/common-drop-downs.route';
import commonCountRoutes from '@modules/common-count-api/common-count-api.route';
import verifyTokenMiddleware from '@middleware/verifyToken';
import { requireApiKey, requireAuthToken } from '@middleware/apiRequest';
const router: Router = Router();

router.use(requireApiKey);

// Super Admin Login Routes

router.use('/auth', authOrganizationRoutes);

router.use(requireAuthToken);

// Middleware
router.use(verifyTokenMiddleware);

// Super Admin Creating Functionality Routes

router.use('/super-admin-module', superAdminRoutes);

// Create Lookups Routes

router.use('/lookups-code', lookupCodeRoutes);

// Create Customer Type Routes

router.use('/customer-types', customerTypeRoutes);

// Company Owner Routes

router.use('/company-owners', companyOwnersRoutes);

// Team Manager Routes

router.use('/team-managers', teamManagerRoutes);

// Team Member Routes

router.use('/team-members', teamMemberRoutes);

// WorkSpaces Routes

// router.use('/workspaces', workspaceRoutes);

// Todos Routes

router.use('/todo-lists', todoListsRoutes);

// alert modes Routes

router.use('/alert-modes', alertModesRoutes);

// client feedbacks Routes

router.use('/client-feedback', clientFeedbacksRoutes);

// document routes

router.use('/document-files', documentFileRoutes);

// event programs Routes

router.use('/event-programs', eventProgramRoutes);

// google Meet Routes

router.use('/google-meet', googleMeetRoutes);

// recruitment posts Routes

router.use('/recruitment-posts', recruitmentPostsRoutes);

// Lookup Module Routes

router.use('/lookups-module', lookupModuleRoute);

// Common Drop Down routes

router.use('/common-drop-downs', commonDropDownRoutes);

router.use('/common-counters', commonCountRoutes);

export default router;
