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
exports.changeGoogleMeetStatus = exports.deleteGoogleMeet = exports.getAllGoogleMeets = exports.updateById = exports.findById = exports.isNameAliasExists = exports.isNameExists = exports.create = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const google_meets_models_1 = __importDefault(require("@models/feature-manage-modules-models/google-meets.models"));
const create = (googleMeetData) => __awaiter(void 0, void 0, void 0, function* () {
    const googleMeet = new google_meets_models_1.default(googleMeetData);
    return yield googleMeet.save();
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
    return yield google_meets_models_1.default.findOne(filter).exec();
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
    return yield google_meets_models_1.default.findOne(filter).exec();
});
exports.isNameAliasExists = isNameAliasExists;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return google_meets_models_1.default
        .findById(id)
        .where({ isDeleted: false })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.findById = findById;
const updateById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return google_meets_models_1.default
        .findByIdAndUpdate(id, {
        $set: Object.assign(Object.assign({}, updateData), { userUpdatedBy: updateData.userUpdatedBy, userUpdatedDate: new Date() }),
    }, { new: true, runValidators: true })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.updateById = updateById;
const getAllGoogleMeets = () => __awaiter(void 0, void 0, void 0, function* () {
    return google_meets_models_1.default
        .find({ isDeleted: false })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .sort({ createdAt: -1 });
});
exports.getAllGoogleMeets = getAllGoogleMeets;
const deleteGoogleMeet = (googleMeetId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    return google_meets_models_1.default.findByIdAndUpdate(googleMeetId, {
        $set: {
            isDeleted: true,
            deletedBy,
            deletedAt: new Date(),
        },
    }, { new: true });
});
exports.deleteGoogleMeet = deleteGoogleMeet;
const changeGoogleMeetStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return google_meets_models_1.default.findByIdAndUpdate(id, {
        $set: {
            status: updatedData.status,
            userUpdatedBy: updatedData.userUpdatedBy,
            userUpdatedDate: updatedData.userUpdatedDate,
        },
    }, { new: true, runValidators: true });
});
exports.changeGoogleMeetStatus = changeGoogleMeetStatus;
