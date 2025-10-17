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
exports.updateIndustryNatureStatus = exports.deleteIndustryNature = exports.getIndustryNatureById = exports.getAllIndustryNatures = exports.editIndustryNatureProfile = exports.createIndustryNatureProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const industryNatureRepository = __importStar(require("./industry-nature.repository"));
const createIndustryNatureProfile = (industryNatureData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new industry nature profile', {
            industryNatureData,
        });
        if (!industryNatureData.name) {
            throw new Error('Industry nature name is required.');
        }
        if (!industryNatureData.nameAlias) {
            throw new Error('Industry nature name alias is required.');
        }
        const existingIndustryNatureByName = yield industryNatureRepository.isNameExists(industryNatureData.name);
        const existingIndustryNatureByAlias = yield industryNatureRepository.isNameAliasExists(industryNatureData.nameAlias);
        if (existingIndustryNatureByName) {
            throw new Error('An industry nature with the same name already exists.');
        }
        if (existingIndustryNatureByAlias) {
            throw new Error('An industry nature with the same name alias already exists.');
        }
        const newIndustryNatureProfile = yield industryNatureRepository.create(industryNatureData);
        yield log_model_1.default.create({
            userId: newIndustryNatureProfile.createdBy,
            module: 'industryNature',
            action: 'create',
            actionId: newIndustryNatureProfile._id,
            description: `Created a new industry nature profile with name: ${newIndustryNatureProfile.name}`,
        });
        return newIndustryNatureProfile;
    }
    catch (error) {
        throw new Error(`Error creating industry nature profile: ${error.message}`);
    }
});
exports.createIndustryNatureProfile = createIndustryNatureProfile;
const editIndustryNatureProfile = (industryNatureId, industryNatureData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing industry nature profile with ID ${industryNatureId}`, {
            industryNatureData,
        });
        if (industryNatureData.name) {
            const existingIndustryNature = yield industryNatureRepository.isNameExists(industryNatureData.name, industryNatureId);
            if (existingIndustryNature) {
                throw new Error('An industry nature with the same name already exists.');
            }
        }
        if (industryNatureData.nameAlias) {
            const existingIndustryNature = yield industryNatureRepository.isNameAliasExists(industryNatureData.nameAlias, industryNatureId);
            if (existingIndustryNature) {
                throw new Error('An industry nature with the same name alias already exists.');
            }
        }
        const updatedIndustryNatureProfile = yield industryNatureRepository.updateById(industryNatureId, industryNatureData);
        if (!updatedIndustryNatureProfile) {
            throw new Error(`Industry nature profile with ID ${industryNatureId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedIndustryNatureProfile.userUpdatedBy,
            module: 'industryNature',
            action: 'edit',
            actionId: updatedIndustryNatureProfile._id,
            description: `Updated industry nature profile with ID ${industryNatureId}`,
        });
        return updatedIndustryNatureProfile;
    }
    catch (error) {
        throw new Error(`Error updating industry nature profile: ${error.message}`);
    }
});
exports.editIndustryNatureProfile = editIndustryNatureProfile;
const getAllIndustryNatures = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all industry natures');
    return industryNatureRepository.getAllIndustrynatures();
});
exports.getAllIndustryNatures = getAllIndustryNatures;
const getIndustryNatureById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting industry nature with ID ${id}`);
    return industryNatureRepository.findById(id);
});
exports.getIndustryNatureById = getIndustryNatureById;
const deleteIndustryNature = (industryNatureId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting industry nature with ID ${industryNatureId} by user ${deletedBy}`);
        const deletedIndustryNature = yield industryNatureRepository.deleteIndustrynature(industryNatureId, deletedBy);
        if (!deletedIndustryNature) {
            throw new Error(`Industry nature profile with ID ${industryNatureId} not found`);
        }
        return deletedIndustryNature;
    }
    catch (error) {
        throw new Error(`Error deleting industry nature profile: ${error.message}`);
    }
});
exports.deleteIndustryNature = deleteIndustryNature;
const updateIndustryNatureStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for industry nature with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield industryNatureRepository.changeIndustrynatureStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Industry nature profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'industryNature',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for industry nature profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating industry nature profile status: ${error.message}`);
    }
});
exports.updateIndustryNatureStatus = updateIndustryNatureStatus;
