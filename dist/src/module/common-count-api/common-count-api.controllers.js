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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDocumentFileCount = exports.getAllRecruitmentCount = exports.getAllGoogleMeetCount = exports.getAllEventCount = exports.getAllTeamMemberCount = exports.getAllTeamManagerCount = exports.getAllCompanyOwnerCount = void 0;
const commonCountApiServices = __importStar(require("./common-count-api.services"));
const responseMessage_1 = require("@constants/responseMessage");
const logger_1 = __importDefault(require("@utils/logger"));
// Company Owner Count Functionality
const getAllCompanyOwnerCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const companyOwnerCount = yield commonCountApiServices.getAllCompanyOwnerCount();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_COMPANY_OWNER_COUNT_SUCCESS,
            companyOwnerCount,
        });
    }
    catch (error) {
        logger_1.default.error('Error in Company Owner Count', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllCompanyOwnerCount = getAllCompanyOwnerCount;
// Team Manager Count Functions
const getAllTeamManagerCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const teamManagerCount = yield commonCountApiServices.getAllTeamManagerCount();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_TEAM_MANAGER_COUNT_SUCCESS,
            teamManagerCount,
        });
    }
    catch (error) {
        logger_1.default.error('Error in Team Manager Count', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllTeamManagerCount = getAllTeamManagerCount;
// Team Member Count Functions
const getAllTeamMemberCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const teamMemberCount = yield commonCountApiServices.getAllTeamMemberCount();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_TEAM_MEMBERS_COUNT_SUCCESS,
            teamMemberCount,
        });
    }
    catch (error) {
        logger_1.default.error('Error in Team Member Count', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllTeamMemberCount = getAllTeamMemberCount;
// Event Count Functions
const getAllEventCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const eventCount = yield commonCountApiServices.getAllEventCount();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_EVENT_PROGRAMS_COUNT_SUCCESS,
            eventCount,
        });
    }
    catch (error) {
        logger_1.default.error('Error in Event Count', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllEventCount = getAllEventCount;
// Google Meet Count Functions
const getAllGoogleMeetCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const googleMeetCount = yield commonCountApiServices.getAllGoogleMeetCount();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_GOOGLE_MEET_COUNT_SUCCESS,
            googleMeetCount,
        });
    }
    catch (error) {
        logger_1.default.error('Error in Google Meet Count', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllGoogleMeetCount = getAllGoogleMeetCount;
// Recruitment Count Functions
const getAllRecruitmentCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const recruitmentCount = yield commonCountApiServices.getAllRecruitmentCount();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_RECRUITMENT_POST_COUNT_SUCCESS,
            recruitmentCount,
        });
    }
    catch (error) {
        logger_1.default.error('Error in Recruitment Count', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllRecruitmentCount = getAllRecruitmentCount;
// File Document Count Functions
const getAllDocumentFileCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const documentFileCount = yield commonCountApiServices.getAllDocumentFileCount();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_DOCUMENT_FILE_COUNT_SUCCESS,
            documentFileCount,
        });
    }
    catch (error) {
        logger_1.default.error('Error in Document File Count', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllDocumentFileCount = getAllDocumentFileCount;
