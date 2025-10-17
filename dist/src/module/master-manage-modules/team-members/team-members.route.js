"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teamMemberControllers = __importStar(require("./team-members.controllers"));
const router = express_1.default.Router();
// Create Team Member Routes
router.post('/create-team-member', teamMemberControllers.createTeamMemberController);
// Get All Team Member Routes
router.get('/get-all-team-members', teamMemberControllers.getAllTeamMembersController);
// Get Team Member By Id Routes
router.get('/:id/get-by-id-team-member', teamMemberControllers.getTeamMemberByIdController);
// Update Team Member Routes
router.put('/:id/update-team-member', teamMemberControllers.updateTeamMemberController);
// Delete Team Member Routes
router.delete('/:id/delete-team-member', teamMemberControllers.deleteTeamMemberController);
// Update Team Member Status Routes
router.patch('/:id/status-change-team-member', teamMemberControllers.updateTeamMemberStatusController);
exports.default = router;
