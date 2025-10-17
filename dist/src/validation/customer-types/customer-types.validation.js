"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerTypeValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const customerTypeValidation = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string()
            .min(3)
            .max(50)
            .pattern(/^[a-zA-Z\s]+$/)
            .required()
            .messages({
            'string.empty': 'Name is required.',
            'string.min': 'Name must be at least 3 characters long.',
            'string.max': 'Name must be at most 50 characters long.',
            'string.pattern.base': 'Name must contain only letters and spaces.',
        }),
    });
    // Sample Validation
    return schema.validate(data, { abortEarly: false });
};
exports.customerTypeValidation = customerTypeValidation;
