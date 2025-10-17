"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import modules
const express_1 = __importDefault(require("express"));
// Import controllers
const auth_organization_login_controllers_1 = require("./auth-organization-login.controllers");
// Define routes
const router = express_1.default.Router();
router.post('/login', auth_organization_login_controllers_1.customerLogin);
exports.default = router;
