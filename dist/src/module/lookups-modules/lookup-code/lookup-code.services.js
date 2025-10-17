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
exports.deleteLookupCode = exports.updateLookupCodeStatus = exports.getLookupCodeByType = exports.editLookupCode = exports.getLookupCodeById = exports.getAllLookupCodes = exports.createLookupCode = void 0;
const lookupCodeRepository = __importStar(require("./lookup-code.repository"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const logger_1 = __importDefault(require("../../../utils/logger"));
const createLookupCode = (lookupCodeData) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Creating lookup code', { lookupCodeData });
    return yield lookupCodeRepository.createLookupCode(lookupCodeData);
});
exports.createLookupCode = createLookupCode;
const getAllLookupCodes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Fetching all lookup codes');
        return yield lookupCodeRepository.getAllLookupCodes();
    }
    catch (error) {
        throw new Error(`Error fetching lookup codes: ${error.message}`);
    }
});
exports.getAllLookupCodes = getAllLookupCodes;
const getLookupCodeById = (lookupCodeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Fetching lookup code with ID ${lookupCodeId}`);
        return yield lookupCodeRepository.findLookupCodeById(lookupCodeId);
    }
    catch (error) {
        throw new Error(`Error fetching lookup code: ${error.message}`);
    }
});
exports.getLookupCodeById = getLookupCodeById;
const editLookupCode = (lookupCodeId, lookupCodeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing lookup code with ID ${lookupCodeId}`, {
            lookupCodeData,
        });
        const updatedLookupCode = yield lookupCodeRepository.updateLookupCode(lookupCodeId, lookupCodeData);
        if (!updatedLookupCode) {
            throw new Error(`LookupCode with ID ${lookupCodeId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedLookupCode.userUpdatedBy,
            module: 'lookup_code',
            action: 'edit',
            actionId: updatedLookupCode._id,
            description: `Updated lookup code with ID ${lookupCodeId}`,
        });
        return updatedLookupCode;
    }
    catch (error) {
        throw new Error(`Error updating lookup code: ${error.message}`);
    }
});
exports.editLookupCode = editLookupCode;
const getLookupCodeByType = (lookupType) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lookupCodeRepository.findLookupCodeByType(lookupType);
});
exports.getLookupCodeByType = getLookupCodeByType;
const updateLookupCodeStatus = (id, updatedData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for lookup code with ID ${id} to ${updatedData.status}`);
        const updatedStatus = yield lookupCodeRepository.changeLookupCodeStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`LookupCode with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedStatus.userUpdatedBy,
            module: 'lookup_code',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated the status for lookup code with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating lookup code status: ${error.message}`);
    }
});
exports.updateLookupCodeStatus = updateLookupCodeStatus;
const deleteLookupCode = (lookupCodeId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting lookup code with ID ${lookupCodeId} by user ${deletedBy}`);
        const deletedLookupCode = yield lookupCodeRepository.deleteLookupCode(lookupCodeId, deletedBy);
        if (!deletedLookupCode) {
            throw new Error(`LookupCode with ID ${lookupCodeId} not found`);
        }
        yield log_model_1.default.create({
            userId: deletedBy,
            module: 'lookup_code',
            action: 'delete',
            actionId: deletedLookupCode._id,
            description: `Deleted lookup code with ID ${lookupCodeId}`,
        });
        return deletedLookupCode;
    }
    catch (error) {
        throw new Error(`Error deleting lookup code: ${error.message}`);
    }
});
exports.deleteLookupCode = deleteLookupCode;
