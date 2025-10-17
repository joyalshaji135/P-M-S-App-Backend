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
exports.updateAlertModeStatus = exports.deleteAlertMode = exports.getAlertModeById = exports.getAllAlertModes = exports.editAlertModeProfile = exports.createAlertModeProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const alertModeRepository = __importStar(require("./alert-modes.repositorys"));
const createAlertModeProfile = (alertModeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new alert mode profile', { alertModeData });
        if (!alertModeData.code) {
            throw new Error('Alert mode code is required.');
        }
        if (!alertModeData.message) {
            throw new Error('Alert mode message is required.');
        }
        const existingAlertModeByCode = yield alertModeRepository.isCodeExists(alertModeData.code);
        if (existingAlertModeByCode) {
            throw new Error('An alert mode with the same code already exists.');
        }
        const newAlertModeProfile = yield alertModeRepository.createAlertMode(alertModeData);
        yield log_model_1.default.create({
            userId: newAlertModeProfile.createdBy,
            module: 'alertMode',
            action: 'create',
            actionId: newAlertModeProfile._id,
            description: `Created a new alert mode profile with code: ${newAlertModeProfile.code}`,
        });
        return newAlertModeProfile;
    }
    catch (error) {
        throw new Error(`Error creating alert mode profile: ${error.message}`);
    }
});
exports.createAlertModeProfile = createAlertModeProfile;
const editAlertModeProfile = (alertModeId, alertModeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing alert mode profile with ID ${alertModeId}`, {
            alertModeData,
        });
        if (alertModeData.code) {
            const existingAlertMode = yield alertModeRepository.isCodeExists(alertModeData.code, alertModeId);
            if (existingAlertMode) {
                throw new Error('An alert mode with the same code already exists.');
            }
        }
        const updatedAlertModeProfile = yield alertModeRepository.updateAlertModeById(alertModeId, alertModeData);
        if (!updatedAlertModeProfile) {
            throw new Error(`Alert mode profile with ID ${alertModeId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedAlertModeProfile.userUpdatedBy,
            module: 'alertMode',
            action: 'edit',
            actionId: updatedAlertModeProfile._id,
            description: `Updated alert mode profile with ID ${alertModeId}`,
        });
        return updatedAlertModeProfile;
    }
    catch (error) {
        throw new Error(`Error updating alert mode profile: ${error.message}`);
    }
});
exports.editAlertModeProfile = editAlertModeProfile;
const getAllAlertModes = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all alert modes');
    return alertModeRepository.getAllAlertModes();
});
exports.getAllAlertModes = getAllAlertModes;
const getAlertModeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting alert mode with ID ${id}`);
    return alertModeRepository.findAlertModeById(id);
});
exports.getAlertModeById = getAlertModeById;
const deleteAlertMode = (alertModeId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting alert mode with ID ${alertModeId} by user ${deletedBy}`);
        const deletedAlertMode = yield alertModeRepository.deleteAlertMode(alertModeId, deletedBy);
        if (!deletedAlertMode) {
            throw new Error(`Alert mode profile with ID ${alertModeId} not found`);
        }
        yield log_model_1.default.create({
            userId: deletedBy,
            module: 'alertMode',
            action: 'delete',
            actionId: deletedAlertMode._id,
            description: `Deleted alert mode profile with ID ${alertModeId}`,
        });
        return deletedAlertMode;
    }
    catch (error) {
        throw new Error(`Error deleting alert mode profile: ${error.message}`);
    }
});
exports.deleteAlertMode = deleteAlertMode;
const updateAlertModeStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for alert mode with ID ${id} to ${updatedData.alertStatus} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield alertModeRepository.changeAlertModeStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Alert mode profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'alertMode',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for alert mode profile with ID ${id} to ${updatedData.alertStatus}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating alert mode profile status: ${error.message}`);
    }
});
exports.updateAlertModeStatus = updateAlertModeStatus;
