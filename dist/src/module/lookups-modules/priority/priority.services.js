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
exports.updatePriorityStatus = exports.deletePriority = exports.getPriorityById = exports.getAllPriorities = exports.editPriorityProfile = exports.createPriorityProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const priorityRepository = __importStar(require("./priority.repository"));
const createPriorityProfile = (priorityData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new priority profile', { priorityData });
        if (!priorityData.name) {
            throw new Error('Priority name is required.');
        }
        if (!priorityData.nameAlias) {
            throw new Error('Priority name alias is required.');
        }
        const existingPriorityByName = yield priorityRepository.isNameExists(priorityData.name);
        const existingPriorityByAlias = yield priorityRepository.isNameAliasExists(priorityData.nameAlias);
        if (existingPriorityByName) {
            throw new Error('A priority with the same name already exists.');
        }
        if (existingPriorityByAlias) {
            throw new Error('A priority with the same name alias already exists.');
        }
        const newPriorityProfile = yield priorityRepository.create(priorityData);
        yield log_model_1.default.create({
            userId: newPriorityProfile.createdBy,
            module: 'priority',
            action: 'create',
            actionId: newPriorityProfile._id,
            description: `Created a new priority profile with name: ${newPriorityProfile.name}`,
        });
        return newPriorityProfile;
    }
    catch (error) {
        throw new Error(`Error creating priority profile: ${error.message}`);
    }
});
exports.createPriorityProfile = createPriorityProfile;
const editPriorityProfile = (priorityId, priorityData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing priority profile with ID ${priorityId}`, {
            priorityData,
        });
        if (priorityData.name) {
            const existingPriority = yield priorityRepository.isNameExists(priorityData.name, priorityId);
            if (existingPriority) {
                throw new Error('A priority with the same name already exists.');
            }
        }
        if (priorityData.nameAlias) {
            const existingPriority = yield priorityRepository.isNameAliasExists(priorityData.nameAlias, priorityId);
            if (existingPriority) {
                throw new Error('A priority with the same name alias already exists.');
            }
        }
        const updatedPriorityProfile = yield priorityRepository.updateById(priorityId, priorityData);
        if (!updatedPriorityProfile) {
            throw new Error(`Priority profile with ID ${priorityId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedPriorityProfile.userUpdatedBy,
            module: 'priority',
            action: 'edit',
            actionId: updatedPriorityProfile._id,
            description: `Updated priority profile with ID ${priorityId}`,
        });
        return updatedPriorityProfile;
    }
    catch (error) {
        throw new Error(`Error updating priority profile: ${error.message}`);
    }
});
exports.editPriorityProfile = editPriorityProfile;
const getAllPriorities = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all priorities');
    return priorityRepository.getAllPriorities();
});
exports.getAllPriorities = getAllPriorities;
const getPriorityById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting priority with ID ${id}`);
    return priorityRepository.findById(id);
});
exports.getPriorityById = getPriorityById;
const deletePriority = (priorityId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting priority with ID ${priorityId} by user ${deletedBy}`);
        const deletedPriority = yield priorityRepository.deletePriority(priorityId, deletedBy);
        if (!deletedPriority) {
            throw new Error(`Priority profile with ID ${priorityId} not found`);
        }
        return deletedPriority;
    }
    catch (error) {
        throw new Error(`Error deleting priority profile: ${error.message}`);
    }
});
exports.deletePriority = deletePriority;
const updatePriorityStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for priority with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield priorityRepository.changePriorityStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Priority profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'priority',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for priority profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating priority profile status: ${error.message}`);
    }
});
exports.updatePriorityStatus = updatePriorityStatus;
