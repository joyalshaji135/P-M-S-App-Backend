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
exports.changeAlertModeStatus = exports.deleteAlertMode = exports.getAllAlertModes = exports.updateAlertModeById = exports.findAlertModeById = exports.isCodeExists = exports.createAlertMode = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const alert_mode_models_1 = __importDefault(require("@models/master-workspace-modules-models/alert-mode.models"));
const createAlertMode = (alertModeData) => __awaiter(void 0, void 0, void 0, function* () {
    const alertMode = new alert_mode_models_1.default(alertModeData);
    return yield alertMode.save();
});
exports.createAlertMode = createAlertMode;
const isCodeExists = (code, idToExclude) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        code: code,
        isDeleted: false,
    };
    if (idToExclude) {
        filter._id = { $ne: new mongoose_1.default.Types.ObjectId(idToExclude) };
    }
    return yield alert_mode_models_1.default.findOne(filter).exec();
});
exports.isCodeExists = isCodeExists;
const findAlertModeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return alert_mode_models_1.default
        .findById(id)
        .where({ isDeleted: false })
        .populate('customer', 'name email') // Assuming customer has 'name' and 'email' fields
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.findAlertModeById = findAlertModeById;
const updateAlertModeById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return alert_mode_models_1.default
        .findByIdAndUpdate(id, {
        $set: Object.assign(Object.assign({}, updateData), { userUpdatedBy: updateData.userUpdatedBy, userUpdatedDate: new Date() }),
    }, { new: true, runValidators: true })
        .populate('customer', 'name email')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.updateAlertModeById = updateAlertModeById;
const getAllAlertModes = () => __awaiter(void 0, void 0, void 0, function* () {
    return alert_mode_models_1.default
        .find({ isDeleted: false })
        .populate('customer', 'name email')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .sort({ createdAt: -1 });
});
exports.getAllAlertModes = getAllAlertModes;
const deleteAlertMode = (alertModeId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    return alert_mode_models_1.default.findByIdAndUpdate(alertModeId, {
        $set: {
            isDeleted: true,
            deletedBy,
            deletedAt: new Date(),
        },
    }, { new: true });
});
exports.deleteAlertMode = deleteAlertMode;
const changeAlertModeStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return alert_mode_models_1.default.findByIdAndUpdate(id, {
        $set: {
            alertStatus: updatedData.alertStatus,
            userUpdatedBy: updatedData.userUpdatedBy,
            userUpdatedDate: updatedData.userUpdatedDate,
        },
    }, { new: true, runValidators: true });
});
exports.changeAlertModeStatus = changeAlertModeStatus;
