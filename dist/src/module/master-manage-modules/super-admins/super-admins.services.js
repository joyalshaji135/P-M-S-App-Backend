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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSuperAdminServices = exports.isPhoneNumberExists = exports.createSuperAdminServices = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const superAdminRepository = __importStar(require("./super-admins.repositorys"));
const responseMessage_1 = require("@constants/responseMessage");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createSuperAdminServices = (superAdminData) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Creating super admin: ${superAdminData.email}`);
    const { password, email } = superAdminData, otherSuperAdminData = __rest(superAdminData, ["password", "email"]);
    if (!password) {
        throw new Error(responseMessage_1.message.PASSWORD_REQUIRED);
    }
    if (!email) {
        throw new Error(responseMessage_1.message.EMAIL_REQUIRED);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newSuperAdmin = Object.assign(Object.assign({}, otherSuperAdminData), { password: hashedPassword, email });
    const existingSuperAdmin = yield superAdminRepository.findByEmail(email);
    if (existingSuperAdmin) {
        throw new Error(responseMessage_1.message.SUPER_ADMIN_EXISTS);
    }
    const createdSuperAdmin = yield superAdminRepository.createSuperAdminRepository(newSuperAdmin);
    return createdSuperAdmin;
});
exports.createSuperAdminServices = createSuperAdminServices;
const isPhoneNumberExists = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    return yield superAdminRepository.isPhoneNumberExists(phone);
});
exports.isPhoneNumberExists = isPhoneNumberExists;
// Get All Super Admin Services
const getAllSuperAdminServices = () => __awaiter(void 0, void 0, void 0, function* () {
    // logger info
    logger_1.default.info('Fetching all super admins');
    return yield superAdminRepository.getAllSuperAdminRepository();
});
exports.getAllSuperAdminServices = getAllSuperAdminServices;
