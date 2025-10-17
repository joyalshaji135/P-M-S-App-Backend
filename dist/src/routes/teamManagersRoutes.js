"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = __importDefault(require("@middleware/verifyToken"));
const apiRequest_1 = require("@middleware/apiRequest");
const auth_organization_login_route_1 = __importDefault(require("@modules/auth-organization/auth-organization-login.route"));
const team_members_route_1 = __importDefault(require("@modules/master-manage-modules/team-members/team-members.route"));
const industry_projects_route_1 = __importDefault(require("@modules/master-workspace-modules/industry-projects/industry-projects.route"));
const task_roles_route_1 = __importDefault(require("@modules/master-workspace-modules/task-roles/task-roles.route"));
const clients_feedbacks_route_1 = __importDefault(require("@modules/master-workspace-modules/clients-feedbacks/clients-feedbacks.route"));
const google_meets_route_1 = __importDefault(require("@modules/feature-manage-modules/google-meets/google-meets.route"));
const recruitment_posts_route_1 = __importDefault(require("@modules/feature-manage-modules/recruitment-posts/recruitment-posts.route"));
const todo_lists_route_1 = __importDefault(require("@modules/master-workspace-modules/todo-lists/todo-lists.route"));
const router = (0, express_1.Router)();
router.use(apiRequest_1.requireApiKey);
// Company Owner Login Routes
router.use('/auth', auth_organization_login_route_1.default);
router.use(apiRequest_1.requireAuthToken);
// Middleware
router.use(verifyToken_1.default);
// Team Member Routes
router.use('/team-members', team_members_route_1.default);
// Projects Routes
router.use('/industry-projects', industry_projects_route_1.default);
// Tasks Routes
router.use('/task-roles', task_roles_route_1.default);
// client feedbacks Routes
router.use('/client-feedback', clients_feedbacks_route_1.default);
// google Meet Routes
router.use('/google-meet', google_meets_route_1.default);
// recruitment posts Routes
router.use('/recruitment-posts', recruitment_posts_route_1.default);
// Todos Routes
router.use('/todo-lists', todo_lists_route_1.default);
exports.default = router;
