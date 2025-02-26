import express from 'express';
import * as authSuperAdminLoginControllers from './auth-organization-login.controllers';

const router = express.Router();
router.post(
  '/super-admin-login',
  authSuperAdminLoginControllers.superAdminLogin,
);
export default router;
