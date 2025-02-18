import express from 'express';
import * as superAdminControllers from './superAdminControllers';

const router = express.Router();

router.post('/create-super-admin', superAdminControllers.createSuperAdminController);
// router.get("/:id", superAdminControllers.getSuperAdminById);
// router.get("/", superAdminControllers.getAllSuperAdmins);

// router.put("/:id", superAdminControllers.updateSuperAdmin);

// router.delete("/:id", superAdminControllers.deleteSuperAdmin);
// router.patch("/:id/status", superAdminControllers.updateSuperAdminStatus);

export default router;
// Define routes

// Super Admin Login and Registration Module

// Super Admin Fetch All Team Members

// Super Admin Fetch All Team Managers

// Super Admin Fetch All Company Owners

// Super Admin Add Team Company Owners

// Super Admin View All Projects

// Super Admin View All Tasks

// Super Admin View All WorkSpaces
