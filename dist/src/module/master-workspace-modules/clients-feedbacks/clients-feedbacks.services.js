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
exports.updateClientFeedbackStatus = exports.deleteClientFeedbackProfile = exports.getClientFeedbackById = exports.getAllClientFeedbacks = exports.editClientFeedbackProfile = exports.createClientFeedbackProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger")); // Adjust the import path as needed
const log_model_1 = __importDefault(require("@models/lookups-models/log.model")); // Adjust the import path as needed
const clientFeedbackRepository = __importStar(require("./clients-feedbacks.repositorys")); // Adjust the import path as needed
// Create a new client feedback profile
const createClientFeedbackProfile = (feedbackData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new client feedback profile', { feedbackData });
        if (!feedbackData.code) {
            throw new Error('Client feedback code is required.');
        }
        if (!feedbackData.comment) {
            throw new Error('Client feedback comment is required.');
        }
        if (!feedbackData.rating) {
            throw new Error('Client feedback rating is required.');
        }
        const existingFeedbackByCode = yield clientFeedbackRepository.isFeedbackCodeExists(feedbackData.code);
        if (existingFeedbackByCode) {
            throw new Error('A client feedback with the same code already exists.');
        }
        const newFeedbackProfile = yield clientFeedbackRepository.createClientFeedback(feedbackData);
        yield log_model_1.default.create({
            userId: newFeedbackProfile.createdBy,
            module: 'clientFeedback',
            action: 'create',
            actionId: newFeedbackProfile._id,
            description: `Created a new client feedback profile with code: ${newFeedbackProfile.code}`,
        });
        return newFeedbackProfile;
    }
    catch (error) {
        throw new Error(`Error creating client feedback profile: ${error.message}`);
    }
});
exports.createClientFeedbackProfile = createClientFeedbackProfile;
// Edit an existing client feedback profile
const editClientFeedbackProfile = (feedbackId, feedbackData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing client feedback profile with ID ${feedbackId}`, {
            feedbackData,
        });
        if (feedbackData.code) {
            const existingFeedback = yield clientFeedbackRepository.isFeedbackCodeExists(feedbackData.code, feedbackId);
            if (existingFeedback) {
                throw new Error('A client feedback with the same code already exists.');
            }
        }
        const updatedFeedbackProfile = yield clientFeedbackRepository.updateClientFeedbackById(feedbackId, feedbackData);
        if (!updatedFeedbackProfile) {
            throw new Error(`Client feedback profile with ID ${feedbackId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedFeedbackProfile.userUpdatedBy,
            module: 'clientFeedback',
            action: 'edit',
            actionId: updatedFeedbackProfile._id,
            description: `Updated client feedback profile with ID ${feedbackId}`,
        });
        return updatedFeedbackProfile;
    }
    catch (error) {
        throw new Error(`Error updating client feedback profile: ${error.message}`);
    }
});
exports.editClientFeedbackProfile = editClientFeedbackProfile;
// Get all client feedback profiles
const getAllClientFeedbacks = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all client feedbacks');
    return clientFeedbackRepository.getAllClientFeedbacks();
});
exports.getAllClientFeedbacks = getAllClientFeedbacks;
// Get a client feedback profile by ID
const getClientFeedbackById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting client feedback with ID ${id}`);
    return clientFeedbackRepository.findClientFeedbackById(id);
});
exports.getClientFeedbackById = getClientFeedbackById;
// Soft delete a client feedback profile
const deleteClientFeedbackProfile = (feedbackId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting client feedback with ID ${feedbackId} by user ${deletedBy}`);
        const deletedFeedback = yield clientFeedbackRepository.deleteClientFeedback(feedbackId, deletedBy);
        if (!deletedFeedback) {
            throw new Error(`Client feedback profile with ID ${feedbackId} not found`);
        }
        yield log_model_1.default.create({
            userId: deletedBy,
            module: 'clientFeedback',
            action: 'delete',
            actionId: deletedFeedback._id,
            description: `Deleted client feedback profile with ID ${feedbackId}`,
        });
        return deletedFeedback;
    }
    catch (error) {
        throw new Error(`Error deleting client feedback profile: ${error.message}`);
    }
});
exports.deleteClientFeedbackProfile = deleteClientFeedbackProfile;
// Update the status of a client feedback profile
const updateClientFeedbackStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for client feedback with ID ${id} to ${updatedData.feedbackStatus} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield clientFeedbackRepository.changeClientFeedbackStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Client feedback profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'clientFeedback',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for client feedback profile with ID ${id} to ${updatedData.feedbackStatus}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating client feedback profile status: ${error.message}`);
    }
});
exports.updateClientFeedbackStatus = updateClientFeedbackStatus;
