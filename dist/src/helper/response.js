"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlNotFound = exports.respondError = exports.respondFailure = exports.respondSuccess = exports.respond = exports.createResponse = void 0;
const statusCodes_json_1 = __importDefault(require("./locales/statusCodes.json"));
const logger_1 = __importDefault(require("../utils/logger"));
const createResponse = (status, message, statusCode, data = null, err = null) => ({
    status,
    message,
    statusCode,
    data,
    err,
});
exports.createResponse = createResponse;
const respond = (res, { status, message, statusCode, data = null, err = null }) => {
    const defaultMessage = status
        ? 'Query was successful'
        : 'Something went wrong';
    if (err) {
        console.log('error', err);
    }
    console.log(status ? 'info' : 'error', message);
    return res.status(statusCode).json(Object.assign({ success: status, message: message || defaultMessage }, (data && { data })));
};
exports.respond = respond;
const respondSuccess = (res, message = 'Query was successful', data = null) => {
    const statusCode = statusCodes_json_1.default.OK;
    console.log('info', message);
    return res.status(statusCode).json(Object.assign({ success: true, message }, (data && { data })));
};
exports.respondSuccess = respondSuccess;
const respondFailure = (res, message, statusCode, err = null) => respond(res, createResponse(false, message, statusCode, null, err));
exports.respondFailure = respondFailure;
const respondError = (message, statusCode = statusCodes_json_1.default.BAD_REQUEST) => {
    const error = new Error(message);
    error.status = statusCode;
    logger_1.default.error('error', message);
    return error;
};
exports.respondError = respondError;
const urlNotFound = () => {
    const message = 'URL not found, please check the documentation';
    console.log('warn', message);
    const error = new Error(message);
    error.status = statusCodes_json_1.default.NOT_FOUND;
    return error;
};
exports.urlNotFound = urlNotFound;
