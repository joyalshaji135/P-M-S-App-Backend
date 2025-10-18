"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyOwnersValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const companyOwnersValidation = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(50).required().messages({
            'string.empty': 'Name is required.',
            'string.min': 'Name must be at least 3 characters long.',
            'string.max': 'Name must be at most 50 characters long.',
        }),
        email: joi_1.default.string().email().required().messages({
            'string.email': 'Invalid email format.',
            'string.empty': 'Email is required.',
        }),
        phone: joi_1.default.string().required(),
        role: joi_1.default.string()
            .valid('company-owners') // Only allows "company-owners"
            .required()
            .messages({
            'any.only': "Invalid role. Only 'company-owners' is allowed.",
        }),
        address: joi_1.default.object({
            street: joi_1.default.string().required(),
            city: joi_1.default.string().required(),
            stateId: joi_1.default.string().required(),
            state: joi_1.default.string().required(),
            district: joi_1.default.string().required(),
            zipCode: joi_1.default.string()
                .pattern(/^\d{5}$/)
                .required()
                .messages({
                'string.pattern.base': 'Zip code must be a 5-digit number.',
            }),
        }).required(),
        preferences: joi_1.default.object({
            newsletter: joi_1.default.boolean().required(),
            notifications: joi_1.default.boolean().required(),
        }).required(),
        company: joi_1.default.object({
            name: joi_1.default.string().required(),
            registrationNumber: joi_1.default.string().required(),
            website: joi_1.default.string().uri().required().messages({
                'string.uri': 'Invalid website URL format.',
            }),
            email: joi_1.default.string().email().required(),
            phone: joi_1.default.string().required(),
            industry: joi_1.default.string().required(),
        }).required(),
        dateOfBirth: joi_1.default.date().iso().required().messages({
            'date.base': 'Invalid date format.',
            'date.iso': 'Date of birth must be in ISO format (YYYY-MM-DD).',
        }),
        gender: joi_1.default.string().valid('male', 'female', 'other').required(),
        lastLogin: joi_1.default.date().iso().optional().messages({
            'date.base': 'Invalid date format.',
            'date.iso': 'Last login must be in ISO format (YYYY-MM-DDTHH:MM:SS.SSSZ).',
        }),
    });
    // Sample Validation
    return schema.validate(data, { abortEarly: false });
};
exports.companyOwnersValidation = companyOwnersValidation;
