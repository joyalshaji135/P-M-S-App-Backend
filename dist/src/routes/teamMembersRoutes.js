"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = __importDefault(require("@middleware/verifyToken"));
const apiRequest_1 = require("@middleware/apiRequest");
const auth_organization_login_route_1 = __importDefault(require("@modules/auth-organization/auth-organization-login.route"));
const segmentation_api_route_1 = __importDefault(require("@src/module/segmentation-apis/segmentation-api.route"));
const task_roles_route_1 = __importDefault(require("@modules/master-workspace-modules/task-roles/task-roles.route"));
const router = (0, express_1.Router)();
router.use(apiRequest_1.requireApiKey);
// Company Owner Login Routes
router.use('/auth', auth_organization_login_route_1.default);
router.use(apiRequest_1.requireAuthToken);
// Middleware
router.use(verifyToken_1.default);
// // Define routes
// team member wise assigned tasks
router.use('/task-wise', segmentation_api_route_1.default);
// Task Roles Routes
router.use('/task-roles', task_roles_route_1.default);
//
exports.default = router;
