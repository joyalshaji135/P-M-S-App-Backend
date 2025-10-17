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
exports.updateIndustryProjectStatus = exports.deleteIndustryProject = exports.getIndustryProjectById = exports.getAllIndustryProjects = exports.editIndustryProject = exports.createIndustryProject = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const industryProjectRepository = __importStar(require("./industry-projects.repository"));
const createIndustryProject = (industryProjectData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new industry project profile', {
            industryProjectData,
        });
        if (!industryProjectData.projectName) {
            throw new Error('Industry project name is required.');
        }
        if (!industryProjectData.nameAlias) {
            throw new Error('Industry project name alias is required.');
        }
        const existingIndustryProjectByName = yield industryProjectRepository.isNameExists(industryProjectData.projectName);
        const existingIndustryProjectByAlias = yield industryProjectRepository.isNameAliasExists(industryProjectData.nameAlias);
        if (existingIndustryProjectByName) {
            throw new Error('An industry project with the same name already exists.');
        }
        if (existingIndustryProjectByAlias) {
            throw new Error('An industry project with the same name alias already exists.');
        }
        const newIndustryProjectProfile = yield industryProjectRepository.create(industryProjectData);
        yield log_model_1.default.create({
            userId: newIndustryProjectProfile.createdBy,
            module: 'industryProject',
            action: 'create',
            actionId: newIndustryProjectProfile._id,
            description: `Created a new industry project profile with name: ${newIndustryProjectProfile.projectName}`,
        });
        return newIndustryProjectProfile;
    }
    catch (error) {
        throw new Error(`Error creating industry project profile: ${error.message}`);
    }
});
exports.createIndustryProject = createIndustryProject;
const editIndustryProject = (industryProjectId, industryProjectData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing industry project profile with ID ${industryProjectId}`, {
            industryProjectData,
        });
        if (industryProjectData.projectName) {
            const existingIndustryProject = yield industryProjectRepository.isNameExists(industryProjectData.projectName, industryProjectId);
            if (existingIndustryProject) {
                throw new Error('An industry project with the same name already exists.');
            }
        }
        if (industryProjectData.nameAlias) {
            const existingIndustryProject = yield industryProjectRepository.isNameAliasExists(industryProjectData.nameAlias, industryProjectId);
            if (existingIndustryProject) {
                throw new Error('An industry project with the same name alias already exists.');
            }
        }
        const updatedIndustryProjectProfile = yield industryProjectRepository.updateById(industryProjectId, industryProjectData);
        if (!updatedIndustryProjectProfile) {
            throw new Error(`Industry project profile with ID ${industryProjectId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedIndustryProjectProfile.userUpdatedBy,
            module: 'industryProject',
            action: 'edit',
            actionId: updatedIndustryProjectProfile._id,
            description: `Updated industry project profile with ID ${industryProjectId}`,
        });
        return updatedIndustryProjectProfile;
    }
    catch (error) {
        throw new Error(`Error updating industry project profile: ${error.message}`);
    }
});
exports.editIndustryProject = editIndustryProject;
const getAllIndustryProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all industry projects');
    return industryProjectRepository.getAllIndustryProjects();
});
exports.getAllIndustryProjects = getAllIndustryProjects;
const getIndustryProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting industry project with ID ${id}`);
    return industryProjectRepository.findById(id);
});
exports.getIndustryProjectById = getIndustryProjectById;
const deleteIndustryProject = (industryProjectId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting industry project with ID ${industryProjectId} by user ${deletedBy}`);
        const deletedIndustryProject = yield industryProjectRepository.deleteIndustryProject(industryProjectId, deletedBy);
        if (!deletedIndustryProject) {
            throw new Error(`Industry project profile with ID ${industryProjectId} not found`);
        }
        return deletedIndustryProject;
    }
    catch (error) {
        throw new Error(`Error deleting industry project profile: ${error.message}`);
    }
});
exports.deleteIndustryProject = deleteIndustryProject;
const updateIndustryProjectStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for industry project with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield industryProjectRepository.changeIndustryProjectStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Industry project profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'industryProject',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for industry project profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating industry project profile status: ${error.message}`);
    }
});
exports.updateIndustryProjectStatus = updateIndustryProjectStatus;
