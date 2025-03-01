import express from 'express';
import * as superAdminControllers from './super-admins.controllers';

const router = express.Router();

router.post(
  '/create-super-admin',
  superAdminControllers.createSuperAdminController,
);
// router.get("/:id", superAdminControllers.getSuperAdminById);
router.get(
  '/get-all-super-admin',
  superAdminControllers.getAllSuperAdminsController,
);

// router.put("/:id", superAdminControllers.updateSuperAdmin);

// router.delete("/:id", superAdminControllers.deleteSuperAdmin);
// router.patch("/:id/status", superAdminControllers.updateSuperAdminStatus);

export default router;
