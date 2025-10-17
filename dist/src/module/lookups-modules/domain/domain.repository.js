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
exports.changeDomainStatus = exports.deleteDomain = exports.getAllDomains = exports.updateById = exports.findById = exports.isNameAliasExists = exports.isNameExists = exports.create = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const domain_model_1 = __importDefault(require("@models/lookups-models/domain.model"));
const create = (domainData) => __awaiter(void 0, void 0, void 0, function* () {
    const domain = new domain_model_1.default(domainData);
    return yield domain.save();
});
exports.create = create;
const isNameExists = (name, idToExclude) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        name: name,
        isDeleted: false,
    };
    if (idToExclude) {
        filter._id = { $ne: new mongoose_1.default.Types.ObjectId(idToExclude) };
    }
    return yield domain_model_1.default.findOne(filter).exec();
});
exports.isNameExists = isNameExists;
const isNameAliasExists = (nameAlias, idToExclude) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        nameAlias: nameAlias,
        isDeleted: false,
    };
    if (idToExclude) {
        filter._id = { $ne: new mongoose_1.default.Types.ObjectId(idToExclude) };
    }
    return yield domain_model_1.default.findOne(filter).exec();
});
exports.isNameAliasExists = isNameAliasExists;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return domain_model_1.default
        .findById(id)
        .where({ isDeleted: false })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.findById = findById;
const updateById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return domain_model_1.default
        .findByIdAndUpdate(id, {
        $set: Object.assign(Object.assign({}, updateData), { userUpdatedBy: updateData.userUpdatedBy, userUpdatedDate: new Date() }),
    }, { new: true, runValidators: true })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.updateById = updateById;
const getAllDomains = () => __awaiter(void 0, void 0, void 0, function* () {
    return domain_model_1.default
        .find({ isDeleted: false })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .sort({ createdAt: -1 });
});
exports.getAllDomains = getAllDomains;
const deleteDomain = (domainId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    return domain_model_1.default.findByIdAndUpdate(domainId, {
        $set: {
            isDeleted: true,
            deletedBy,
            deletedAt: new Date(),
        },
    }, { new: true });
});
exports.deleteDomain = deleteDomain;
const changeDomainStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return domain_model_1.default.findByIdAndUpdate(id, {
        $set: {
            status: updatedData.status,
            userUpdatedBy: updatedData.userUpdatedBy,
            userUpdatedDate: updatedData.userUpdatedDate,
        },
    }, { new: true, runValidators: true });
});
exports.changeDomainStatus = changeDomainStatus;
