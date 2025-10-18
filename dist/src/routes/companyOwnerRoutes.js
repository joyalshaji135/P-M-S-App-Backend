"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = __importDefault(require("@middleware/verifyToken"));
const apiRequest_1 = require("@middleware/apiRequest");
const auth_organization_login_route_1 = __importDefault(require("@modules/auth-organization/auth-organization-login.route"));
const team_managers_route_1 = __importDefault(require("@modules/master-manage-modules/team-managers/team-managers.route"));
const team_members_route_1 = __importDefault(require("@modules/master-manage-modules/team-members/team-members.route"));
const industry_projects_route_1 = __importDefault(require("@modules/master-workspace-modules/industry-projects/industry-projects.route"));
const task_roles_route_1 = __importDefault(require("@modules/master-workspace-modules/task-roles/task-roles.route"));
const alert_modes_route_1 = __importDefault(require("@modules/master-workspace-modules/alert-modes/alert-modes.route"));
const clients_feedbacks_route_1 = __importDefault(require("@modules/master-workspace-modules/clients-feedbacks/clients-feedbacks.route"));
const event_programs_route_1 = __importDefault(require("@modules/feature-manage-modules/event-programs/event-programs.route"));
const google_meets_route_1 = __importDefault(require("@modules/feature-manage-modules/google-meets/google-meets.route"));
const recruitment_posts_route_1 = __importDefault(require("@modules/feature-manage-modules/recruitment-posts/recruitment-posts.route"));
const lookupsRoutes_1 = __importDefault(require("@modules/lookups-modules/lookupsRoutes"));
const active_logo_module_route_1 = __importDefault(require("@modules/active-log-module/active-logo-module.route"));
const router = (0, express_1.Router)();
router.use(apiRequest_1.requireApiKey);
// Company Owner Login Routes
router.use('/auth', auth_organization_login_route_1.default);
router.use(apiRequest_1.requireAuthToken);
// Middleware
router.use(verifyToken_1.default);
// // Define routes
// Team Manager Routes
router.use('/team-managers', team_managers_route_1.default);
// Team Member Routes
router.use('/team-members', team_members_route_1.default);
// Projects Routes
router.use('/industry-projects', industry_projects_route_1.default);
// Tasks Routes
router.use('/task-roles', task_roles_route_1.default);
// WorkSpaces Routes
// router.use('/workspaces', workspaceRoutes);
// alert modes Routes
router.use('/alert-modes', alert_modes_route_1.default);
// client feedbacks Routes
router.use('/client-feedback', clients_feedbacks_route_1.default);
// event programs Routes
router.use('/event-programs', event_programs_route_1.default);
// google Meet Routes
router.use('/google-meet', google_meets_route_1.default);
// recruitment posts Routes
router.use('/recruitment-posts', recruitment_posts_route_1.default);
// common drop downs Routes
router.use('/lookups', lookupsRoutes_1.default);
// user log
router.use('/active-log', active_logo_module_route_1.default);
exports.default = router;
