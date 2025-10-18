"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const super_admins_route_1 = __importDefault(require("@modules/master-manage-modules/super-admins/super-admins.route"));
const auth_organization_login_route_1 = __importDefault(require("@modules/auth-organization/auth-organization-login.route"));
const customer_type_route_1 = __importDefault(require("@modules/lookups-modules/customer-type/customer-type.route"));
const company_owners_route_1 = __importDefault(require("@modules/master-manage-modules/company-owners/company-owners.route"));
const team_managers_route_1 = __importDefault(require("@modules/master-manage-modules/team-managers/team-managers.route"));
const team_members_route_1 = __importDefault(require("@modules/master-manage-modules/team-members/team-members.route"));
const todo_lists_route_1 = __importDefault(require("@modules/master-workspace-modules/todo-lists/todo-lists.route"));
const alert_modes_route_1 = __importDefault(require("@modules/master-workspace-modules/alert-modes/alert-modes.route"));
const clients_feedbacks_route_1 = __importDefault(require("@modules/master-workspace-modules/clients-feedbacks/clients-feedbacks.route"));
const document_files_route_1 = __importDefault(require("@modules/feature-manage-modules/document-files/document-files.route"));
const event_programs_route_1 = __importDefault(require("@modules/feature-manage-modules/event-programs/event-programs.route"));
const google_meets_route_1 = __importDefault(require("@modules/feature-manage-modules/google-meets/google-meets.route"));
const recruitment_posts_route_1 = __importDefault(require("@modules/feature-manage-modules/recruitment-posts/recruitment-posts.route"));
const lookupsRoutes_1 = __importDefault(require("@modules/lookups-modules/lookupsRoutes"));
const lookupsRoutes_2 = __importDefault(require("@modules/lookups-modules/lookupsRoutes"));
const contact_us_route_1 = __importDefault(require("@modules/feature-manage-modules/contact-us/contact-us.route"));
// import commonDropDownRoutes from '@modules/common-drop-downs/common-drop-downs.route';
const common_drop_downs_route_1 = __importDefault(require("@modules/common-drop-downs/common-drop-downs.route"));
const common_count_api_route_1 = __importDefault(require("@modules/common-count-api/common-count-api.route"));
const verifyToken_1 = __importDefault(require("@middleware/verifyToken"));
const apiRequest_1 = require("@middleware/apiRequest");
const router = (0, express_1.Router)();
router.use(apiRequest_1.requireApiKey);
// Super Admin Creating Functionality Routes
router.use('/super-admin-module', super_admins_route_1.default);
// Super Admin Login Routes
router.use('/auth', auth_organization_login_route_1.default);
router.use(apiRequest_1.requireAuthToken);
// Middleware
router.use(verifyToken_1.default);
// Create Lookups Routes
router.use('/lookups-code', lookupsRoutes_1.default);
// Create Customer Type Routes
router.use('/customer-types', customer_type_route_1.default);
// Company Owner Routes
router.use('/company-owners', company_owners_route_1.default);
// Team Manager Routes
router.use('/team-managers', team_managers_route_1.default);
// Team Member Routes
router.use('/team-members', team_members_route_1.default);
// WorkSpaces Routes
// router.use('/workspaces', workspaceRoutes);
// Todos Routes
router.use('/todo-lists', todo_lists_route_1.default);
// alert modes Routes
router.use('/alert-modes', alert_modes_route_1.default);
// client feedbacks Routes
router.use('/client-feedback', clients_feedbacks_route_1.default);
// document routes
router.use('/document-files', document_files_route_1.default);
// event programs Routes
router.use('/event-programs', event_programs_route_1.default);
// google Meet Routes
router.use('/google-meet', google_meets_route_1.default);
// recruitment posts Routes
router.use('/recruitment-posts', recruitment_posts_route_1.default);
// Lookup Module Routes
router.use('/lookups-module', lookupsRoutes_2.default);
// Common Drop Down routes
router.use('/common-drop-downs', common_drop_downs_route_1.default);
router.use('/common-counters', common_count_api_route_1.default);
router.use('/contact-us', contact_us_route_1.default);
exports.default = router;
