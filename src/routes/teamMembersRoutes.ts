import { Router } from 'express';
import verifyTokenMiddleware from '@middleware/verifyToken';
import { requireApiKey, requireAuthToken } from '@middleware/apiRequest';
import teamMemberAuthLoginRoutes from '@modules/auth-organization/auth-organization-login.route';

const router: Router = Router();

router.use(requireApiKey);

// Company Owner Login Routes

router.use('/auth', teamMemberAuthLoginRoutes);

router.use(requireAuthToken);

// Middleware
router.use(verifyTokenMiddleware);

// // Define routes



export default router;