"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./src/config/database"); // Import database connection
const http_1 = __importDefault(require("http"));
const app_config_1 = __importDefault(require("./app.config"));
const app = http_1.default.createServer(app_config_1.default);
// Default Admin Creating Function
// Connect to MongoDB
(0, database_1.connectToDatabase)();
exports.default = app;
