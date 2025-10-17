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
exports.changeCompanyOwnerStatus = exports.getAllCompanyOwners = exports.deleteCompanyOwner = exports.updateCompanyOwner = exports.findCompanyOwnerById = exports.isEmailExists = exports.isNameExists = exports.isCompanyOwnerNameExists = exports.isPhoneNumberExists = exports.findByEmail = exports.createCompanyOwnerRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customer_models_1 = __importDefault(require("@models/master-manage-modules-models/customer.models"));
const createCompanyOwnerRepository = (companyOwnerData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new customer_models_1.default(companyOwnerData);
    return yield user.save();
});
exports.createCompanyOwnerRepository = createCompanyOwnerRepository;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findOne({ email }).exec();
});
exports.findByEmail = findByEmail;
const isPhoneNumberExists = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findOne({ phone }).exec();
});
exports.isPhoneNumberExists = isPhoneNumberExists;
// Company Owner Name is Existing
const isCompanyOwnerNameExists = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findOne({ name }).exec();
});
exports.isCompanyOwnerNameExists = isCompanyOwnerNameExists;
const isNameExists = (name, idToExclude) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        name: name,
        isDeleted: false,
    };
    if (idToExclude) {
        filter._id = { $ne: new mongoose_1.default.Types.ObjectId(idToExclude) };
    }
    return yield customer_models_1.default.findOne(filter).exec();
});
exports.isNameExists = isNameExists;
const isEmailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findOne({ email }).exec();
});
exports.isEmailExists = isEmailExists;
const findCompanyOwnerById = (companyOwnerId) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default
        .findById(companyOwnerId)
        .where({ isDeleted: false })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .populate('deletedBy', 'name email')
        .exec();
});
exports.findCompanyOwnerById = findCompanyOwnerById;
const updateCompanyOwner = (companyOwnerId, companyOwnerData) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findByIdAndUpdate(companyOwnerId, { $set: companyOwnerData }, { new: true, runValidators: true });
});
exports.updateCompanyOwner = updateCompanyOwner;
const deleteCompanyOwner = (companyOwnerId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findByIdAndUpdate(companyOwnerId, {
        $set: {
            isDeleted: true,
            deletedBy,
            deletedAt: new Date(),
        },
    }, { new: true });
});
exports.deleteCompanyOwner = deleteCompanyOwner;
const getAllCompanyOwners = () => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default
        .find({ isDeleted: false, role: 'company-owners' })
        .sort({ createdAt: -1 });
});
exports.getAllCompanyOwners = getAllCompanyOwners;
const changeCompanyOwnerStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findByIdAndUpdate(id, {
        $set: {
            status: updatedData.status,
            userUpdatedBy: updatedData.userUpdatedBy,
            userUpdatedDate: updatedData.userUpdatedDate,
        },
    }, { new: true, runValidators: true });
});
exports.changeCompanyOwnerStatus = changeCompanyOwnerStatus;
