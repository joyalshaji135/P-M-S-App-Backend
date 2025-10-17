"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import morgan from "morgan";
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
// import hpp from "hpp";
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const routes_1 = __importDefault(require("./src/routes"));
const response_1 = require("./src/helper/response");
const i18n_config_1 = __importDefault(require("./src/config/i18n.config"));
const path_1 = __importDefault(require("path"));
const corsOptions = {
    origin: 'http://localhost:5173', // Allow the client origin
    credentials: true,
    exposedHeaders: 'Content-Type, X-Auth-Token, x-app-version, x-api-key',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
};
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
    max: 1800, // Maximum of 1800 requests in 15 minutes
    standardHeaders: true, // Include `RateLimit-*` headers in response
    legacyHeaders: false, // Disable `X-RateLimit-*` headers (older version)
});
const expressApp = (0, express_1.default)();
expressApp.use((0, helmet_1.default)());
expressApp.use(helmet_1.default.hidePoweredBy());
expressApp.use((0, express_mongo_sanitize_1.default)());
expressApp.use(body_parser_1.default.urlencoded({ extended: true }));
expressApp.use(body_parser_1.default.json());
expressApp.use(limiter);
expressApp.use((0, cors_1.default)(corsOptions));
// Handle preflight requests (OPTIONS)
expressApp.options('*', (0, cors_1.default)(corsOptions));
expressApp.use(i18n_config_1.default.init);
const upload = (0, multer_1.default)({
    limits: {
        fileSize: Number(process.env.MAXFILESIZE),
    },
});
expressApp.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'public/uploads')));
// Define API route with error handling middleware
expressApp.use('/api', 
// upload.any(),
routes_1.default, (err, req, res, next) => {
    console.log(err, 'error');
    const status = err.status || 400;
    return res.status(status).json({
        success: false,
        message: err.message,
    });
});
expressApp.use((err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const error = err;
    const status = err.statusCode || err.status || 500;
    console.error(err);
    if (error.message) {
        return (0, response_1.respond)(res, {
            status: false,
            message: error.message
                ? error.message.replace('Error: ', '')
                : err.statusMessage,
            statusCode: status,
        });
    }
    return next();
});
exports.default = expressApp;
