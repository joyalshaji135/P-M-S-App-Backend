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
// Skill Schema
const skillSchema = new mongoose_1.Schema({
    skillName: { type: String, required: false },
    proficiency: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        required: false,
    },
    yearsOfExperience: { type: Number, required: false },
    certification: { type: String },
});
// Customer Schema
const customerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin', 'company-owners', 'team-managers', 'team-members'],
    },
    password: { type: String },
    isDefault: { type: Boolean, default: false },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    profilePicture: { type: String },
    lastLogin: { type: Date },
    preferences: {
        newsletter: { type: Boolean, default: false },
        notifications: { type: Boolean, default: true },
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        stateId: { type: String },
        state: { type: String, required: true },
        district: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    // Array of skills
    skills: [skillSchema],
    company: {
        name: { type: String, required: false },
        registrationNumber: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        industry: { type: String, required: false },
        website: { type: String, required: false },
    },
});
// Add base schema fields (like createdBy, updatedBy, etc.)
customerSchema.add(base_model_1.baseSchema);
exports.default = mongoose_1.default.model('customer', customerSchema);
//  Json Format for customer
// {
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "phone": "1234567890",
//     "role": "customer",
//     "password": "securepassword",
//     "isDefault": false,
//     "dateOfBirth": "1990-01-01T00:00:00.000Z",
//     "gender": "male",
//     "profilePicture": "https://example.com/profile.jpg",
//     "status": "active",
//     "lastLogin": "2023-10-01T12:34:56.000Z",
//     "preferences": {
//       "newsletter": true,
//       "notifications": false
//     },
//     "address": {
//       "street": "123 Main St",
//       "city": "New York",
//       "state": "NY",
//       "district": "Manhattan",
//       "zipCode": "10001"
//     }
//   }
