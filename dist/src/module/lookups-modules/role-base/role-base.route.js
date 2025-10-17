"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_base_controllers_1 = require("./role-base.controllers"); // Updated import path
const router = (0, express_1.Router)();
// Updated route paths and function names
router.post('/create-role-base', role_base_controllers_1.createRoleBaseProfile);
router.patch('/:id/status-change-role-base', role_base_controllers_1.updateRoleBaseStatus);
router.put('/:id/update-role-base', role_base_controllers_1.editRoleBaseProfile);
router.delete('/:id/delete-role-base', role_base_controllers_1.deleteRoleBaseProfile);
router.get('/:id/get-by-id-role-base', role_base_controllers_1.getRoleBaseById);
router.get('/get-all-role-bases', role_base_controllers_1.getAllRoleBases);
exports.default = router;
