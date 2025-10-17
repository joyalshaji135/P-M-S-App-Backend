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
exports.deleteLookupCode = exports.changeLookupCodeStatus = exports.findLookupCodeByType = exports.updateLookupCode = exports.findLookupCodeById = exports.getAllLookupCodes = exports.createLookupCode = void 0;
const lookup_code_model_1 = __importDefault(require("@models/lookups-models/lookup-code.model"));
const createLookupCode = (lookupCodeData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingLookupCode = yield lookup_code_model_1.default.findOne({
        $or: [
            { type: lookupCodeData.type },
            { name: lookupCodeData.name },
            { code: lookupCodeData.code },
        ],
    });
    if (existingLookupCode) {
        throw new Error('A LookupCode with the same type, name, or code already exists.');
    }
    const lookupCode = new lookup_code_model_1.default(lookupCodeData);
    return yield lookupCode.save();
});
exports.createLookupCode = createLookupCode;
const getAllLookupCodes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield lookup_code_model_1.default.find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .where({ isDeleted: false })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .populate('deletedBy', 'name email')
        .exec();
});
exports.getAllLookupCodes = getAllLookupCodes;
const findLookupCodeById = (lookupCodeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lookup_code_model_1.default.findById(lookupCodeId, { isDeleted: false })
        .where({ isDeleted: false })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .populate('deletedBy', 'name email')
        .exec();
});
exports.findLookupCodeById = findLookupCodeById;
const updateLookupCode = (lookupCodeId, lookupCodeData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lookup_code_model_1.default.findByIdAndUpdate(lookupCodeId, { $set: lookupCodeData }, { new: true, runValidators: true });
});
exports.updateLookupCode = updateLookupCode;
const findLookupCodeByType = (lookupType) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lookup_code_model_1.default.findOne({ type: lookupType });
});
exports.findLookupCodeByType = findLookupCodeByType;
const changeLookupCodeStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return lookup_code_model_1.default.findByIdAndUpdate(id, {
        $set: {
            status: updatedData.status,
            userUpdatedBy: updatedData.userUpdatedBy,
            userUpdatedDate: updatedData.userUpdatedDate,
        },
    }, { new: true, runValidators: true });
});
exports.changeLookupCodeStatus = changeLookupCodeStatus;
const deleteLookupCode = (lookupCodeId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lookup_code_model_1.default.findByIdAndUpdate(lookupCodeId, {
        $set: {
            isDeleted: true,
            deletedBy,
            deletedAt: new Date(),
        },
    }, { new: true });
});
exports.deleteLookupCode = deleteLookupCode;
