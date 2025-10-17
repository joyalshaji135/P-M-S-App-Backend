"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthToken = exports.requireApiKey = void 0;
const response_1 = require("../helper/response");
const statusCodes_json_1 = __importDefault(require("@helper/locales/statusCodes.json"));
const requireApiKey = (req, res, next) => {
    if (req.originalUrl.startsWith('/uploads')) {
        return next();
    }
    const apiKey = req.header('x-api-key');
    const appVersion = req.header('x-app-version');
    const deviceType = req.header('x-app-deviceType');
    if (!apiKey) {
        return next((0, response_1.respondError)('x-api-key is required in header', statusCodes_json_1.default.FORBIDDEN));
    }
    if (!appVersion) {
        return next((0, response_1.respondError)('x-app-version is required in header', statusCodes_json_1.default.FORBIDDEN));
    }
    if (apiKey !== process.env.API_KEY) {
        return next((0, response_1.respondError)('invalid api-key', statusCodes_json_1.default.FORBIDDEN));
    }
    req.appVersion = appVersion || '';
    req.deviceType = deviceType || '';
    return next();
};
exports.requireApiKey = requireApiKey;
const requireAuthToken = (req, res, next) => {
    if (req.originalUrl.startsWith('/uploads')) {
        return next();
    }
    if (!req.header('Authorization')) {
        return res.status(403).json({ message: 'Auth token required' });
    }
    return next();
};
exports.requireAuthToken = requireAuthToken;
