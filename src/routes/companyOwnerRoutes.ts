import { Router } from 'express';
import verifyTokenMiddleware from '@middleware/verifyToken';
import { requireApiKey, requireAuthToken } from '@middleware/apiRequest';
import companyOwnerAuthLoginRoutes from '@modules/auth-organization/auth-organization-login.route';
import teamManagerRoutes from '@modules/master-manage-modules/team-managers/team-managers.route';
import teamMemberRoutes from '@modules/master-manage-modules/team-members/team-members.route';
import industryProjectRoutes from '@modules/master-workspace-modules/industry-projects/industry-projects.route';
import taskRolesRoutes from '@modules/master-workspace-modules/task-roles/task-roles.route';
// import workspaceRoutes from '@modules/master-workspace-modules/workspaces/workspaces.route';
import todoListsRoutes from '@modules/master-workspace-modules/todo-lists/todo-lists.route';
import alertModesRoutess from '@modules/master-workspace-modules/alert-modes/alert-modes.route';
import clientFeedbacksRoutes from '@modules/master-workspace-modules/clients-feedbacks/clients-feedbacks.route';
import documentFileRoutes from '@modules/feature-manage-modules/document-files/document-files.route';
import eventProgramRoutes from '@modules/feature-manage-modules/event-programs/event-programs.route';
import googleMeetRoutes from '@modules/feature-manage-modules/google-meets/google-meets.route';
import recruitmentPostsRoutes from '@modules/feature-manage-modules/recruitment-posts/recruitment-posts.route';
const router: Router = Router();

router.use(requireApiKey);

// Company Owner Login Routes

router.use('/auth', companyOwnerAuthLoginRoutes);

router.use(requireAuthToken);

// Middleware
router.use(verifyTokenMiddleware);

// // Define routes

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

// alert modes Routes

router.use('/alert-modes', alertModesRoutess);

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

export default router;
