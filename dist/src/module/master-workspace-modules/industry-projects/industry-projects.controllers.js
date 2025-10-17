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
exports.updateIndustryProjectStatus = exports.getAllIndustryProjects = exports.getIndustryProjectById = exports.deleteIndustryProject = exports.editIndustryProject = exports.createIndustryProject = void 0;
const industryProjectService = __importStar(require("./industry-projects.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const team_managers_services_1 = require("@src/module/master-manage-modules/team-managers/team-managers.services");
const team_members_services_1 = require("@src/module/master-manage-modules/team-members/team-members.services");
const createIndustryProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const projectName = req.body.projectName;
        const nameAlias = projectName
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.INDUSTRY_PROJECT;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const industryProjectData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // const { error } = industryProjectValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        // Validate the getTeamMemberById and getTeamManagerById
        const teamManager = yield (0, team_managers_services_1.getTeamManagerById)(req.body.customer);
        if (!teamManager) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TEAM_MANAGER_NOT_FOUND,
            });
        }
        const teamMember = yield (0, team_members_services_1.getTeamMemberById)(req.body.customer);
        if (!teamMember) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TEAM_MEMBER_NOT_FOUND,
            });
        }
        const createdIndustryProject = yield industryProjectService.createIndustryProject(industryProjectData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.INDUSTRY_PROJECT_CREATED_SUCCESS,
            industryProject: createdIndustryProject,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createIndustryProject = createIndustryProject;
const editIndustryProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const industryProjectData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    // const { error } = industryProjectValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const industryProject = yield industryProjectService.getIndustryProjectById(id);
        if (!industryProject) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_PROJECT_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            industryProjectData.nameAlias = nameAlias;
        }
        const updatedIndustryProject = yield industryProjectService.editIndustryProject(id, industryProjectData);
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.INDUSTRY_PROJECT_UPDATED_SUCCESS,
            industryProject: updatedIndustryProject,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editIndustryProject = editIndustryProject;
const deleteIndustryProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedIndustryProject = yield industryProjectService.deleteIndustryProject(id, req.userId);
        if (!deletedIndustryProject) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_PROJECT_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.INDUSTRY_PROJECT_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteIndustryProject = deleteIndustryProject;
const getIndustryProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const industryProject = yield industryProjectService.getIndustryProjectById(id);
        if (!industryProject) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_PROJECT_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            industryProject,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getIndustryProjectById = getIndustryProjectById;
const getAllIndustryProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const industryProjects = yield industryProjectService.getAllIndustryProjects();
        if (industryProjects.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_PROJECT_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
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
const updateIndustryProjectStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: responseMessage_1.message.UNAUTHORIZED,
        });
    }
    console.log(req.userId);
    const userStatusUpdateData = Object.assign(Object.assign({}, req.body), { userUpdatedBy: req.userId, userUpdatedDate: new Date() });
    try {
        // Get IndustryProject By Id from the database
        const industryProject = yield industryProjectService.getIndustryProjectById(id);
        if (!industryProject) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_PROJECT_NOT_FOUND,
            });
        }
        const updatedIndustryProject = yield industryProjectService.updateIndustryProjectStatus(id, userStatusUpdateData);
        if (!updatedIndustryProject) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_PROJECT_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.INDUSTRY_PROJECT_STATUS_UPDATED,
            industryProject: updatedIndustryProject,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateIndustryProjectStatus = updateIndustryProjectStatus;
