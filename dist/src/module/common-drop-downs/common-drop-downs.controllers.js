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
exports.getAllIndustryProjects = exports.getAllRole = exports.getAllPriority = exports.getAllTaskModules = exports.getAllIndustryNatures = exports.getAllDomainLists = exports.getAllCustomerTypeList = exports.getAllCompanyOwnerList = exports.getAllTeamManagerList = exports.getAllTeamMemberList = void 0;
const CommonDropdownService = __importStar(require("./common-drop-downs.services"));
const responseMessage_1 = require("@constants/responseMessage");
const logger_1 = __importDefault(require("@utils/logger"));
// Get All Team Member List Functionality
const getAllTeamMemberList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const teamMemberList = yield CommonDropdownService.getAllTeamMemberList();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_TEAM_MEMBER_LIST_SUCCESS,
            teamMemberList,
        });
    }
    catch (error) {
        logger_1.default.error('Error in getAllTeamMemberList', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllTeamMemberList = getAllTeamMemberList;
// Get All Team Member List Functionality
const getAllTeamManagerList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const teamManagerList = yield CommonDropdownService.getAllTeamManagerList();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_TEAM_MANAGER_LIST_SUCCESS,
            teamManagerList,
        });
    }
    catch (error) {
        logger_1.default.error('Error in getAllTeamManagerList', error.message);
        return res.status(500).json({});
    }
});
exports.getAllTeamManagerList = getAllTeamManagerList;
// Get All Company Owner List Functionality
const getAllCompanyOwnerList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const companyOwnerList = yield CommonDropdownService.getAllCompanyOwnerList();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_COMPANY_OWNER_LIST_SUCCESS,
            companyOwnerList,
        });
    }
    catch (error) {
        logger_1.default.error('Error in getAllCompanyOwnerList', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllCompanyOwnerList = getAllCompanyOwnerList;
// Get All Customer Type List Functionality
const getAllCustomerTypeList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const customerTypeList = yield CommonDropdownService.getAllCustomerTypeList();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_CUSTOMER_TYPE_LIST_SUCCESS,
            customerTypeList,
        });
    }
    catch (error) {
        logger_1.default.error('Error in getAllCustomerTypeList', error.message);
        return res.status(500).json({});
    }
});
exports.getAllCustomerTypeList = getAllCustomerTypeList;
// Get All Domain Lists Functionality
const getAllDomainLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const domainLists = yield CommonDropdownService.getAllDomainLists();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_DOMAIN_LIST_SUCCESS,
            domainLists,
        });
    }
    catch (error) {
        logger_1.default.error('Error in getAllDomainLists', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllDomainLists = getAllDomainLists;
// Get All Industry Nature Functionality
const getAllIndustryNatures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const industryNatures = yield CommonDropdownService.getAllIndustryNatures();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_INDUSTRY_NATURE_LIST_SUCCESS,
            industryNatures,
        });
    }
    catch (error) {
        logger_1.default.error('Error in getAllIndustryNatures', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllIndustryNatures = getAllIndustryNatures;
// Get All Task Module Functionality
const getAllTaskModules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const taskModules = yield CommonDropdownService.getAllTaskModules();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_TASK_MODULE_LIST_SUCCESS,
            taskModules,
        });
    }
    catch (error) {
        logger_1.default.error('Error in getAllTaskModules', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllTaskModules = getAllTaskModules;
// Get All Priority Functionality
const getAllPriority = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const priority = yield CommonDropdownService.getAllPriority();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_PRIORITY_LIST_SUCCESS,
            priority,
        });
    }
    catch (error) {
        logger_1.default.error('Error in getAllPriority', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllPriority = getAllPriority;
// Get All Role Functionality
const getAllRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const role = yield CommonDropdownService.getAllRole();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_ROLE_LIST_SUCCESS,
            role,
        });
    }
    catch (error) {
        logger_1.default.error('Error in getAllRole', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllRole = getAllRole;
// Get all Industry Project Functionality
const getAllIndustryProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const industryProjects = yield CommonDropdownService.getAllIndustryProjects();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_INDUSTRY_PROJECT_LIST_SUCCESS,
            industryProjects,
        });
    }
    catch (error) {
        logger_1.default.error('Error in getAllIndustryProjects', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllIndustryProjects = getAllIndustryProjects;
