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
exports.updateRoleBaseStatus = exports.deleteRoleBase = exports.getRoleBaseById = exports.getAllRoleBases = exports.editRoleBaseProfile = exports.createRoleBaseProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const roleBaseRepository = __importStar(require("./role-base.repositorys"));
const createRoleBaseProfile = (roleBaseData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new role base profile', { roleBaseData });
        if (!roleBaseData.name) {
            throw new Error('Role base name is required.');
        }
        if (!roleBaseData.nameAlias) {
            throw new Error('Role base name alias is required.');
        }
        const existingRoleBaseByName = yield roleBaseRepository.isNameExists(roleBaseData.name);
        const existingRoleBaseByAlias = yield roleBaseRepository.isNameAliasExists(roleBaseData.nameAlias);
        if (existingRoleBaseByName) {
            throw new Error('A role base with the same name already exists.');
        }
        if (existingRoleBaseByAlias) {
            throw new Error('A role base with the same name alias already exists.');
        }
        const newRoleBaseProfile = yield roleBaseRepository.create(roleBaseData);
        yield log_model_1.default.create({
            userId: newRoleBaseProfile.createdBy,
            module: 'roleBase',
            action: 'create',
            actionId: newRoleBaseProfile._id,
            description: `Created a new role base profile with name: ${newRoleBaseProfile.name}`,
        });
        return newRoleBaseProfile;
    }
    catch (error) {
        throw new Error(`Error creating role base profile: ${error.message}`);
    }
});
exports.createRoleBaseProfile = createRoleBaseProfile;
const editRoleBaseProfile = (roleBaseId, roleBaseData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing role base profile with ID ${roleBaseId}`, {
            roleBaseData,
        });
        if (roleBaseData.name) {
            const existingRoleBase = yield roleBaseRepository.isNameExists(roleBaseData.name, roleBaseId);
            if (existingRoleBase) {
                throw new Error('A role base with the same name already exists.');
            }
        }
        if (roleBaseData.nameAlias) {
            const existingRoleBase = yield roleBaseRepository.isNameAliasExists(roleBaseData.nameAlias, roleBaseId);
            if (existingRoleBase) {
                throw new Error('A role base with the same name alias already exists.');
            }
        }
        const updatedRoleBaseProfile = yield roleBaseRepository.updateById(roleBaseId, roleBaseData);
        if (!updatedRoleBaseProfile) {
            throw new Error(`Role base profile with ID ${roleBaseId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedRoleBaseProfile.userUpdatedBy,
            module: 'roleBase',
            action: 'edit',
            actionId: updatedRoleBaseProfile._id,
            description: `Updated role base profile with ID ${roleBaseId}`,
        });
        return updatedRoleBaseProfile;
    }
    catch (error) {
        throw new Error(`Error updating role base profile: ${error.message}`);
    }
});
exports.editRoleBaseProfile = editRoleBaseProfile;
const getAllRoleBases = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all role bases');
    return roleBaseRepository.getAllRoleBases();
});
exports.getAllRoleBases = getAllRoleBases;
const getRoleBaseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting role base with ID ${id}`);
    return roleBaseRepository.findById(id);
});
exports.getRoleBaseById = getRoleBaseById;
const deleteRoleBase = (roleBaseId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting role base with ID ${roleBaseId} by user ${deletedBy}`);
        const deletedRoleBase = yield roleBaseRepository.deleteRoleBase(roleBaseId, deletedBy);
        if (!deletedRoleBase) {
            throw new Error(`Role base profile with ID ${roleBaseId} not found`);
        }
        return deletedRoleBase;
    }
    catch (error) {
        throw new Error(`Error deleting role base profile: ${error.message}`);
    }
});
exports.deleteRoleBase = deleteRoleBase;
const updateRoleBaseStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for role base with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield roleBaseRepository.changeRoleBaseStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Role base profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'roleBase',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for role base profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating role base profile status: ${error.message}`);
    }
});
exports.updateRoleBaseStatus = updateRoleBaseStatus;
