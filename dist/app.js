"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./src/config/database"); // Import database connection
const http_1 = __importDefault(require("http"));
const app_config_1 = __importDefault(require("./app.config"));
const defaultAdminCreation_1 = require("@src/service/defaultAdminCreation");
const app = http_1.default.createServer(app_config_1.default);
// Default Admin Creating Function
// Connect to MongoDB
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectToDatabase)();
        console.log('✅ Database connection established successfully.');
        // Create default admin if not exists
        yield (0, defaultAdminCreation_1.defaultAdminServices)();
        console.log('✅ Default admin check/creation completed.');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1); // Exit the process if the connection fails
    }
});
startApp();
exports.default = app;
