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
// Count Functionality
const express_1 = __importDefault(require("express"));
const commonCountApiControllers = __importStar(require("./common-count-api.controllers"));
const router = express_1.default.Router();
// Company Owner Count Functions
router.get('/company-owner-count', commonCountApiControllers.getAllCompanyOwnerCount);
// Team Manager Count Functions
router.get('/team-manager-count', commonCountApiControllers.getAllTeamManagerCount);
// Team Member Count Functions
router.get('/team-member-count', commonCountApiControllers.getAllTeamMemberCount);
// Event Count Functions
router.get('/event-count', commonCountApiControllers.getAllEventCount);
// Google Meet Count Functions
router.get('/google-meet-count', commonCountApiControllers.getAllGoogleMeetCount);
// Recruitment Count Functions
router.get('/recruitment-count', commonCountApiControllers.getAllRecruitmentCount);
// File Document Count Functions
router.get('/file-document-count', commonCountApiControllers.getAllDocumentFileCount);
// Task Count Functions
router.get('/task-count', commonCountApiControllers.getAllTaskCount);
// project Count Functions
router.get('/industry-project-count', commonCountApiControllers.getAllProjectCount);
// feedback Count Functions
router.get('/feedback-count', commonCountApiControllers.getAllFeedbackCount);
exports.default = router;
