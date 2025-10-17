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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const base_model_1 = require("../lookups-models/base.model");
const industryProjectSchema = new mongoose_1.Schema({
    code: { type: String, required: true },
    projectName: { type: String, required: true },
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'customer', required: true },
    industry: { type: mongoose_1.Schema.Types.ObjectId, ref: 'industry', required: true },
    priority: { type: mongoose_1.Schema.Types.ObjectId, ref: 'priority', required: true },
    description: { type: String, required: true },
    projectStatus: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    nameAlias: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: (v) => /^[a-z0-9\-]+$/.test(v),
            message: 'nameAlias must be lowercase, without spaces, and can include hyphens!',
        },
    },
});
industryProjectSchema.add(base_model_1.baseSchema);
exports.default = mongoose_1.default.model('industryProject', industryProjectSchema);
