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
exports.updateClientFeedbackStatus = exports.getClientFeedbackById = exports.getAllClientFeedbacks = exports.deleteClientFeedbackProfile = exports.editClientFeedbackProfile = exports.createClientFeedbackProfile = void 0;
const clientFeedbackService = __importStar(require("./clients-feedbacks.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
// Create a new client feedback profile
const createClientFeedbackProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const { code, comment, rating, customer, industryProject } = req.body;
        // Generate a new lookup code if needed
        const lookupType = lookup_1.LookupTypes.CLIENT_FEEDBACK;
        const generatedCode = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const feedbackData = {
            code: generatedCode,
            comment,
            rating,
            customer,
            industryProject,
            createdBy: req.userId,
            submittedAt: new Date(),
        };
        // Uncomment if validation is needed
        // const { error } = clientFeedbackValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdFeedback = yield clientFeedbackService.createClientFeedbackProfile(feedbackData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.CLIENT_FEEDBACK_CREATED_SUCCESS, // Update the success message
            feedback: createdFeedback,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createClientFeedbackProfile = createClientFeedbackProfile;
// Edit an existing client feedback profile
const editClientFeedbackProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const feedbackData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get Client Feedback By Id from the database
        const feedback = yield clientFeedbackService.getClientFeedbackById(id);
        if (!feedback) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
            });
        }
        const existingFeedback = yield clientFeedbackService.getClientFeedbackById(id);
        if (!existingFeedback) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
            });
        }
        const updatedFeedback = yield clientFeedbackService.editClientFeedbackProfile(id, feedbackData);
        if (!updatedFeedback) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.CLIENT_FEEDBACK_UPDATED_SUCCESS, // Update the success message
            feedback: updatedFeedback,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editClientFeedbackProfile = editClientFeedbackProfile;
// Delete a client feedback profile
const deleteClientFeedbackProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedFeedback = yield clientFeedbackService.deleteClientFeedbackProfile(id, req.userId);
        if (!deletedFeedback) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.CLIENT_FEEDBACK_DELETED, // Update the success message
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteClientFeedbackProfile = deleteClientFeedbackProfile;
// Get all client feedback profiles
const getAllClientFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbacks = yield clientFeedbackService.getAllClientFeedbacks();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.CLIENT_FEEDBACKS_FETCHED_SUCCESS, // Update the success message
            feedbacks,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllClientFeedbacks = getAllClientFeedbacks;
// Get a client feedback profile by ID
const getClientFeedbackById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const feedback = yield clientFeedbackService.getClientFeedbackById(id);
        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: responseMessage_1.message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.CLIENT_FEEDBACK_FETCHED_SUCCESS, // Update the success message
            feedback,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getClientFeedbackById = getClientFeedbackById;
// Update the status of a client feedback profile
const updateClientFeedbackStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { feedbackStatus, userUpdatedBy } = req.body;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const updatedFeedback = yield clientFeedbackService.updateClientFeedbackStatus(id, {
            feedbackStatus,
            userUpdatedBy: req.userId,
            userUpdatedDate: new Date(),
        });
        if (!updatedFeedback) {
            return res.status(404).json({
                success: false,
                message: responseMessage_1.message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.CLIENT_FEEDBACK_STATUS_UPDATED, // Update the success message
            feedback: updatedFeedback,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateClientFeedbackStatus = updateClientFeedbackStatus;
