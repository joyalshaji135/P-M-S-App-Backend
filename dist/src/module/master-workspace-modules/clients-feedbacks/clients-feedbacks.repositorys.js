"use strict";
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
exports.changeClientFeedbackStatus = exports.deleteClientFeedback = exports.getAllClientFeedbacks = exports.updateClientFeedbackById = exports.findClientFeedbackById = exports.isFeedbackCodeExists = exports.createClientFeedback = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const clients_feedbacks_models_1 = __importDefault(require("@models/master-workspace-modules-models/clients-feedbacks.models")); // Adjust the import path as needed
// Create a new client feedback entry
const createClientFeedback = (feedbackData) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = new clients_feedbacks_models_1.default(feedbackData);
    return yield feedback.save();
});
exports.createClientFeedback = createClientFeedback;
// Check if a feedback code already exists (excluding a specific ID if provided)
const isFeedbackCodeExists = (code, idToExclude) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        code: code,
        isDeleted: false,
    };
    if (idToExclude) {
        filter._id = { $ne: new mongoose_1.default.Types.ObjectId(idToExclude) };
    }
    return yield clients_feedbacks_models_1.default.findOne(filter).exec();
});
exports.isFeedbackCodeExists = isFeedbackCodeExists;
// Find a client feedback entry by ID
const findClientFeedbackById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return clients_feedbacks_models_1.default
        .findById(id)
        .where({ isDeleted: false })
        .populate('customer', 'name email') // Assuming customer has 'name' and 'email' fields
        .populate('industryProject', 'name code') // Assuming industryProject has 'name' and 'code' fields
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.findClientFeedbackById = findClientFeedbackById;
// Update a client feedback entry by ID
const updateClientFeedbackById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return clients_feedbacks_models_1.default
        .findByIdAndUpdate(id, {
        $set: Object.assign(Object.assign({}, updateData), { userUpdatedBy: updateData.userUpdatedBy, userUpdatedDate: new Date() }),
    }, { new: true, runValidators: true })
        .populate('customer', 'name email')
        .populate('industryProject', 'name code')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.updateClientFeedbackById = updateClientFeedbackById;
// Get all client feedback entries (non-deleted)
const getAllClientFeedbacks = () => __awaiter(void 0, void 0, void 0, function* () {
    return clients_feedbacks_models_1.default
        .find({ isDeleted: false })
        .populate('customer', 'name email')
        .populate('industryProject', 'name code')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .sort({ createdAt: -1 });
});
exports.getAllClientFeedbacks = getAllClientFeedbacks;
// Soft delete a client feedback entry
const deleteClientFeedback = (feedbackId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    return clients_feedbacks_models_1.default.findByIdAndUpdate(feedbackId, {
        $set: {
            isDeleted: true,
            deletedBy,
            deletedAt: new Date(),
        },
    }, { new: true });
});
exports.deleteClientFeedback = deleteClientFeedback;
// Change the status of a client feedback entry
const changeClientFeedbackStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return clients_feedbacks_models_1.default.findByIdAndUpdate(id, {
        $set: {
            feedbackStatus: updatedData.feedbackStatus,
            userUpdatedBy: updatedData.userUpdatedBy,
            userUpdatedDate: updatedData.userUpdatedDate,
        },
    }, { new: true, runValidators: true });
});
exports.changeClientFeedbackStatus = changeClientFeedbackStatus;
