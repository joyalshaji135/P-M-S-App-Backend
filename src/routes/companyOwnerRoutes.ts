import { Router } from 'express';
import verifyTokenMiddleware from '@middleware/verifyToken';
import { requireApiKey, requireAuthToken } from '@middleware/apiRequest';
import companyOwnerAuthLoginRoutes from '@modules/auth-organization/auth-organization-login.route';

const router: Router = Router();

router.use(requireApiKey);

// Company Owner Login Routes

router.use('/auth-company-owner', companyOwnerAuthLoginRoutes);

router.use(requireAuthToken);

// Middleware   
router.use(verifyTokenMiddleware);

// // Define routes

// Common Functionality

// Auth

// Team Members

// Team Managers

// Company Owners

// Projects

// Tasks

// WorkSpaces

export default router;
