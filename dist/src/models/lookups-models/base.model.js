"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.baseSchema = new mongoose_1.Schema({
    status: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'customer' },
    userUpdatedDate: { type: Date },
    userUpdatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'customer' },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'customer' },
    deletedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'customer' },
    deletedAt: { type: Date },
    isDefault: { type: Boolean, default: true },
}, { timestamps: true });
