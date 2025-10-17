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
exports.changeTodoListStatus = exports.deleteTodoList = exports.getAllTodoLists = exports.updateById = exports.findById = exports.isTitleExists = exports.isNameAliasExists = exports.isNameExists = exports.create = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todo_lists_models_1 = __importDefault(require("@models/master-workspace-modules-models/todo-lists.models"));
const create = (todoListData) => __awaiter(void 0, void 0, void 0, function* () {
    const todoList = new todo_lists_models_1.default(todoListData);
    return yield todoList.save();
});
exports.create = create;
const isNameExists = (title, idToExclude) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        titleName: title,
        isDeleted: false,
    };
    if (idToExclude) {
        filter._id = { $ne: new mongoose_1.default.Types.ObjectId(idToExclude) };
    }
    return yield todo_lists_models_1.default.findOne(filter).exec();
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
    return yield todo_lists_models_1.default.findOne(filter).exec();
});
exports.isNameAliasExists = isNameAliasExists;
const isTitleExists = (title, idToExclude) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        title: title,
        isDeleted: false,
    };
    if (idToExclude) {
        filter._id = { $ne: new mongoose_1.default.Types.ObjectId(idToExclude) };
    }
    return yield todo_lists_models_1.default.findOne(filter).exec();
});
exports.isTitleExists = isTitleExists;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return todo_lists_models_1.default
        .findById(id)
        .where({ isDeleted: false })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.findById = findById;
const updateById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return todo_lists_models_1.default
        .findByIdAndUpdate(id, {
        $set: Object.assign(Object.assign({}, updateData), { userUpdatedBy: updateData.userUpdatedBy, userUpdatedDate: new Date() }),
    }, { new: true, runValidators: true })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.updateById = updateById;
const getAllTodoLists = () => __awaiter(void 0, void 0, void 0, function* () {
    return todo_lists_models_1.default
        .find({ isDeleted: false })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .sort({ createdAt: -1 });
});
exports.getAllTodoLists = getAllTodoLists;
const deleteTodoList = (todoListId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    return todo_lists_models_1.default.findByIdAndUpdate(todoListId, {
        $set: {
            isDeleted: true,
            deletedBy,
            deletedAt: new Date(),
        },
    }, { new: true });
});
exports.deleteTodoList = deleteTodoList;
const changeTodoListStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return todo_lists_models_1.default.findByIdAndUpdate(id, {
        $set: {
            status: updatedData.status,
            userUpdatedBy: updatedData.userUpdatedBy,
            userUpdatedDate: updatedData.userUpdatedDate,
        },
    }, { new: true, runValidators: true });
});
exports.changeTodoListStatus = changeTodoListStatus;
