"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.industryProjectValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const industryProjectValidation = (data) => {
    const schema = joi_1.default.object({
        projectName: joi_1.default.string().min(3).max(100).required().messages({
            'string.empty': 'Project name is required.',
            'string.min': 'Project name must be at least 3 characters long.',
            'string.max': 'Project name must be at most 100 characters long.',
        }),
        customer: joi_1.default.string()
            .pattern(/^[a-fA-F0-9]{24}$/)
            .required()
            .messages({
            'string.pattern.base': 'Invalid customer ID format.',
            'string.empty': 'Customer ID is required.',
        }),
        industry: joi_1.default.string().min(3).max(50).required().messages({
            'string.empty': 'Industry is required.',
            'string.min': 'Industry must be at least 3 characters long.',
            'string.max': 'Industry must be at most 50 characters long.',
        }),
        priority: joi_1.default.string()
            .valid('Low', 'Medium', 'High', 'Critical')
            .required()
            .messages({
            'any.only': "Invalid priority. Allowed values: 'Low', 'Medium', 'High', 'Critical'.",
            'string.empty': 'Priority is required.',
        }),
        description: joi_1.default.string().min(10).max(500).required().messages({
            'string.empty': 'Description is required.',
            'string.min': 'Description must be at least 10 characters long.',
            'string.max': 'Description must be at most 500 characters long.',
        }),
        projectStatus: joi_1.default.string()
            .valid('Planned', 'Ongoing', 'Completed', 'On Hold', 'Cancelled')
            .required()
            .messages({
            'any.only': "Invalid project status. Allowed values: 'Planned', 'Ongoing', 'Completed', 'On Hold', 'Cancelled'.",
            'string.empty': 'Project status is required.',
        }),
        startDate: joi_1.default.date().iso().required().messages({
            'date.base': 'Invalid start date format.',
            'date.iso': 'Start date must be in ISO format (YYYY-MM-DDTHH:MM:SS.SSSZ).',
        }),
        endDate: joi_1.default.date()
            .iso()
            .greater(joi_1.default.ref('startDate'))
            .required()
            .messages({
            'date.base': 'Invalid end date format.',
            'date.iso': 'End date must be in ISO format (YYYY-MM-DDTHH:MM:SS.SSSZ).',
            'date.greater': 'End date must be after the start date.',
        }),
    });
    // Validate data
    return schema.validate(data, { abortEarly: false });
};
exports.industryProjectValidation = industryProjectValidation;
