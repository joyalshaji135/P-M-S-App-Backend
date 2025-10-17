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
exports.getAllSuperAdminRepository = exports.isPhoneNumberExists = exports.findByEmail = exports.createSuperAdminRepository = void 0;
const customer_models_1 = __importDefault(require("@models/master-manage-modules-models/customer.models"));
// To Create Super Admin
const createSuperAdminRepository = (superAdminData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new customer_models_1.default(superAdminData);
    return yield user.save();
});
exports.createSuperAdminRepository = createSuperAdminRepository;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findOne({ email }).exec();
});
exports.findByEmail = findByEmail;
const isPhoneNumberExists = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findOne({ phone }).exec();
});
exports.isPhoneNumberExists = isPhoneNumberExists;
// Get All Super Admin
const getAllSuperAdminRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.find({ role: 'admin' }).exec();
});
exports.getAllSuperAdminRepository = getAllSuperAdminRepository;
