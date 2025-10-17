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
exports.updateGoogleMeetStatus = exports.deleteGoogleMeet = exports.getGoogleMeetById = exports.getAllGoogleMeets = exports.editGoogleMeetProfile = exports.createGoogleMeetProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const googleMeetRepository = __importStar(require("./google-meets.repositorys"));
const createGoogleMeetProfile = (googleMeetData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new google meet profile', { googleMeetData });
        if (!googleMeetData.name) {
            throw new Error('Google meet name is required.');
        }
        if (!googleMeetData.nameAlias) {
            throw new Error('Google meet name alias is required.');
        }
        const existingGoogleMeetByName = yield googleMeetRepository.isNameExists(googleMeetData.name);
        const existingGoogleMeetByAlias = yield googleMeetRepository.isNameAliasExists(googleMeetData.nameAlias);
        if (existingGoogleMeetByName) {
            throw new Error('A google meet with the same name already exists.');
        }
        if (existingGoogleMeetByAlias) {
            throw new Error('A google meet with the same name alias already exists.');
        }
        const newGoogleMeetProfile = yield googleMeetRepository.create(googleMeetData);
        yield log_model_1.default.create({
            userId: newGoogleMeetProfile.createdBy,
            module: 'googleMeet',
            action: 'create',
            actionId: newGoogleMeetProfile._id,
            description: `Created a new google meet profile with name: ${newGoogleMeetProfile.name}`,
        });
        return newGoogleMeetProfile;
    }
    catch (error) {
        throw new Error(`Error creating google meet profile: ${error.message}`);
    }
});
exports.createGoogleMeetProfile = createGoogleMeetProfile;
const editGoogleMeetProfile = (googleMeetId, googleMeetData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing google meet profile with ID ${googleMeetId}`, {
            googleMeetData,
        });
        if (googleMeetData.name) {
            const existingGoogleMeet = yield googleMeetRepository.isNameExists(googleMeetData.name, googleMeetId);
            if (existingGoogleMeet) {
                throw new Error('A google meet with the same name already exists.');
            }
        }
        if (googleMeetData.nameAlias) {
            const existingGoogleMeet = yield googleMeetRepository.isNameAliasExists(googleMeetData.nameAlias, googleMeetId);
            if (existingGoogleMeet) {
                throw new Error('A google meet with the same name alias already exists.');
            }
        }
        const updatedGoogleMeetProfile = yield googleMeetRepository.updateById(googleMeetId, googleMeetData);
        if (!updatedGoogleMeetProfile) {
            throw new Error(`Google meet profile with ID ${googleMeetId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedGoogleMeetProfile.userUpdatedBy,
            module: 'googleMeet',
            action: 'edit',
            actionId: updatedGoogleMeetProfile._id,
            description: `Updated google meet profile with ID ${googleMeetId}`,
        });
        return updatedGoogleMeetProfile;
    }
    catch (error) {
        throw new Error(`Error updating google meet profile: ${error.message}`);
    }
});
exports.editGoogleMeetProfile = editGoogleMeetProfile;
const getAllGoogleMeets = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all google meets');
    return googleMeetRepository.getAllGoogleMeets();
});
exports.getAllGoogleMeets = getAllGoogleMeets;
const getGoogleMeetById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting google meet with ID ${id}`);
    return googleMeetRepository.findById(id);
});
exports.getGoogleMeetById = getGoogleMeetById;
const deleteGoogleMeet = (googleMeetId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting google meet with ID ${googleMeetId} by user ${deletedBy}`);
        const deletedGoogleMeet = yield googleMeetRepository.deleteGoogleMeet(googleMeetId, deletedBy);
        if (!deletedGoogleMeet) {
            throw new Error(`Google meet profile with ID ${googleMeetId} not found`);
        }
        return deletedGoogleMeet;
    }
    catch (error) {
        throw new Error(`Error deleting google meet profile: ${error.message}`);
    }
});
exports.deleteGoogleMeet = deleteGoogleMeet;
const updateGoogleMeetStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for google meet with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield googleMeetRepository.changeGoogleMeetStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Google meet profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'googleMeet',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for google meet profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating google meet profile status: ${error.message}`);
    }
});
exports.updateGoogleMeetStatus = updateGoogleMeetStatus;
