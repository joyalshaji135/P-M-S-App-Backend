"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const superAdminRoutes_1 = __importDefault(require("./superAdminRoutes"));
const companyOwnerRoutes_1 = __importDefault(require("./companyOwnerRoutes"));
const teamManagersRoutes_1 = __importDefault(require("./teamManagersRoutes"));
const teamMembersRoutes_1 = __importDefault(require("./teamMembersRoutes"));
const router = (0, express_1.Router)();
// Super Admin Routes
router.use('/super-admin', superAdminRoutes_1.default);
// Company Owner Routes
router.use('/company-owner', companyOwnerRoutes_1.default);
// Team Member Routes
router.use('/team-manager', teamManagersRoutes_1.default);
// Team Manager Routes
router.use('/team-member', teamMembersRoutes_1.default);
exports.default = router;
