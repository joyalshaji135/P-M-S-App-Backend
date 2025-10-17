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
exports.changeTaskRoleStatus = exports.deleteTaskRole = exports.getAllTaskRoles = exports.updateById = exports.findById = exports.isNameAliasExists = exports.isNameExists = exports.create = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const task_role_models_1 = __importDefault(require("@models/master-workspace-modules-models/task-role.models"));
const create = (taskRoleData) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRole = new task_role_models_1.default(taskRoleData);
    return yield taskRole.save();
});
exports.create = create;
const isNameExists = (taskRoleName, idToExclude) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        taskRoleName: taskRoleName,
        isDeleted: false,
    };
    if (idToExclude) {
        filter._id = { $ne: new mongoose_1.default.Types.ObjectId(idToExclude) };
    }
    return yield task_role_models_1.default.findOne(filter).exec();
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
    return yield task_role_models_1.default.findOne(filter).exec();
});
exports.isNameAliasExists = isNameAliasExists;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return task_role_models_1.default
        .findById(id)
        .where({ isDeleted: false })
        .populate('resourceName', 'name email role phone')
        .populate('project', 'projectName industry description projectStatus')
        .populate('taskModule', 'name code')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.findById = findById;
const updateById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return task_role_models_1.default
        .findByIdAndUpdate(id, {
        $set: Object.assign(Object.assign({}, updateData), { userUpdatedBy: updateData.userUpdatedBy, userUpdatedDate: new Date() }),
    }, { new: true, runValidators: true })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.updateById = updateById;
const getAllTaskRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    return task_role_models_1.default
        .find({ isDeleted: false })
        .populate('resourceName', 'name email role phone')
        .populate('taskModule', 'name code')
        .populate('project', 'projectName industry description projectStatus')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .sort({ createdAt: -1 });
});
exports.getAllTaskRoles = getAllTaskRoles;
const deleteTaskRole = (taskRoleId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    return task_role_models_1.default.findByIdAndUpdate(taskRoleId, {
        $set: {
            isDeleted: true,
            deletedBy,
            deletedAt: new Date(),
        },
    }, { new: true });
});
exports.deleteTaskRole = deleteTaskRole;
const changeTaskRoleStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return task_role_models_1.default.findByIdAndUpdate(id, {
        $set: {
            status: updatedData.status,
            userUpdatedBy: updatedData.userUpdatedBy,
            userUpdatedDate: updatedData.userUpdatedDate,
        },
    }, { new: true, runValidators: true });
});
exports.changeTaskRoleStatus = changeTaskRoleStatus;
