import { Router } from 'express';
import verifyTokenMiddleware from '@middleware/verifyToken';
import { requireApiKey, requireAuthToken } from '@middleware/apiRequest';
import teamMemberAuthLoginRoutes from '@modules/auth-organization/auth-organization-login.route';
import segmentationApiRoutes from '@modules/segmentation-apis/segmentation-api.route';
import taskRolesRoutes from '@modules/master-workspace-modules/task-roles/task-roles.route';

const router: Router = Router();

router.use(requireApiKey);

// Company Owner Login Routes

router.use('/auth', teamMemberAuthLoginRoutes);

router.use(requireAuthToken);

// Middleware
router.use(verifyTokenMiddleware);

// // Define routes

// team member wise assigned tasks
router.use('/task-wise', segmentationApiRoutes);

// Task Roles Routes

router.use('/task-roles', taskRolesRoutes);

// 


export default router;
