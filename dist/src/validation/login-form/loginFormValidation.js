"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFormValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Function to validate the login form data
const loginFormValidation = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default
            .string()
            .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/))
            .required()
            .messages({
            'string.pattern.base': 'Email must be a valid address ending with .com, .net, or .org',
        }),
        password: joi_1.default.string().min(4).max(30).required(),
        role: joi_1.default
            .string()
            .valid('team-members', 'team-managers', 'company-owners', 'admin')
            .required(),
    });
    return schema.validate(data);
};
exports.loginFormValidation = loginFormValidation;
