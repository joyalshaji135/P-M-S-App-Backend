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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFileDocuments = exports.getAllGoogleMeetings = exports.getAllIndustryProjects = exports.projectAssignedClientController = exports.taskAssignedClientController = void 0;
const responseMessage_1 = require("@constants/responseMessage");
const segmentationService = __importStar(require("./segmentation-api.services"));
// taskAssignedClient this function
const taskAssignedClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { client_id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const taskAssigned = yield segmentationService.taskAssignedClientServices(client_id);
        if (!taskAssigned) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            taskAssigned,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.taskAssignedClientController = taskAssignedClientController;
// projectAssignedClientController
const projectAssignedClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { client_id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const projectAssigned = yield segmentationService.projectAssignedClientServices(client_id);
        if (!projectAssigned) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            projectAssigned,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.projectAssignedClientController = projectAssignedClientController;
// getAllIndustryProjects
const getAllIndustryProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const industryProjects = yield segmentationService.getAllIndustryProjects();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_INDUSTRY_PROJECT_LIST_SUCCESS,
            industryProjects,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllIndustryProjects = getAllIndustryProjects;
// getAllGoogleMeetings
const getAllGoogleMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const googleMeetings = yield segmentationService.getAllGoogleMeetings();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_GOOGLE_MEETING_LIST_SUCCESS,
            googleMeetings,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllGoogleMeetings = getAllGoogleMeetings;
// getAllFileDocuments
const getAllFileDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const fileDocuments = yield segmentationService.getAllFileDocuments();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_FILE_DOCUMENT_LIST_SUCCESS,
            fileDocuments,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllFileDocuments = getAllFileDocuments;
