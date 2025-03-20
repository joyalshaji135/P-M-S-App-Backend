import { Router } from 'express';
import verifyTokenMiddleware from '@middleware/verifyToken';
import { requireApiKey, requireAuthToken } from '@middleware/apiRequest';
import companyOwnerAuthLoginRoutes from '@modules/auth-organization/auth-organization-login.route';
import teamMemberRoutes from '@modules/master-manage-modules/team-members/team-members.route';
import industryProjectRoutes from '@modules/master-workspace-modules/industry-projects/industry-projects.route';
import taskRolesRoutes from '@modules/master-workspace-modules/task-roles/task-roles.route';
import clientFeedbacksRoutes from '@modules/master-workspace-modules/clients-feedbacks/clients-feedbacks.route';
import googleMeetRoutes from '@modules/feature-manage-modules/google-meets/google-meets.route';
import recruitmentPostsRoutes from '@modules/feature-manage-modules/recruitment-posts/recruitment-posts.route';
import todoListsRoutes from '@modules/master-workspace-modules/todo-lists/todo-lists.route';
const router: Router = Router();

router.use(requireApiKey);

// Company Owner Login Routes

router.use('/auth', companyOwnerAuthLoginRoutes);

router.use(requireAuthToken);

// Middleware
router.use(verifyTokenMiddleware);

// Team Member Routes

router.use('/team-members', teamMemberRoutes);

// Projects Routes

router.use('/industry-projects', industryProjectRoutes);

// Tasks Routes

router.use('/task-roles', taskRolesRoutes);

// client feedbacks Routes

router.use('/client-feedback', clientFeedbacksRoutes);

// google Meet Routes

router.use('/google-meet', googleMeetRoutes);

// recruitment posts Routes

router.use('/recruitment-posts', recruitmentPostsRoutes);

// Todos Routes

router.use('/todo-lists', todoListsRoutes);

export default router;
