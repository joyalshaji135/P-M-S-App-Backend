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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoListStatus = exports.deleteTodoList = exports.getTodoListById = exports.getAllTodoLists = exports.editTodoListProfile = exports.createTodoListProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const todoListRepository = __importStar(require("./todo-lists.repositorys"));
const createTodoListProfile = (todoListData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new todo list profile', { todoListData });
        if (!todoListData.titleName) {
            throw new Error('Todo list name is required.');
        }
        if (!todoListData.nameAlias) {
            throw new Error('Todo list name alias is required.');
        }
        const existingTodoListByName = yield todoListRepository.isNameExists(todoListData.titleName);
        const existingTodoListByAlias = yield todoListRepository.isNameAliasExists(todoListData.nameAlias);
        if (existingTodoListByName) {
            throw new Error('A todo list with the same name already exists.');
        }
        if (existingTodoListByAlias) {
            throw new Error('A todo list with the same name alias already exists.');
        }
        const newTodoListProfile = yield todoListRepository.create(todoListData);
        yield log_model_1.default.create({
            userId: newTodoListProfile.createdBy,
            module: 'todoList',
            action: 'create',
            actionId: newTodoListProfile._id,
            description: `Created a new todo list profile with name: ${newTodoListProfile.titleName}`,
        });
        return newTodoListProfile;
    }
    catch (error) {
        throw new Error(`Error creating todo list profile: ${error.message}`);
    }
});
exports.createTodoListProfile = createTodoListProfile;
const editTodoListProfile = (todoListId, todoListData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing todo list profile with ID ${todoListId}`, {
            todoListData,
        });
        if (todoListData.titleName) {
            const existingTodoList = yield todoListRepository.isNameExists(todoListData.titleName, todoListId);
            if (existingTodoList) {
                throw new Error('A todo list with the same name already exists.');
            }
        }
        if (todoListData.nameAlias) {
            const existingTodoList = yield todoListRepository.isNameAliasExists(todoListData.nameAlias, todoListId);
            if (existingTodoList) {
                throw new Error('A todo list with the same name alias already exists.');
            }
        }
        const updatedTodoListProfile = yield todoListRepository.updateById(todoListId, todoListData);
        if (!updatedTodoListProfile) {
            throw new Error(`Todo list profile with ID ${todoListId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedTodoListProfile.userUpdatedBy,
            module: 'todoList',
            action: 'edit',
            actionId: updatedTodoListProfile._id,
            description: `Updated todo list profile with ID ${todoListId}`,
        });
        return updatedTodoListProfile;
    }
    catch (error) {
        throw new Error(`Error updating todo list profile: ${error.message}`);
    }
});
exports.editTodoListProfile = editTodoListProfile;
const getAllTodoLists = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all todo lists');
    return todoListRepository.getAllTodoLists();
});
exports.getAllTodoLists = getAllTodoLists;
const getTodoListById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting todo list with ID ${id}`);
    return todoListRepository.findById(id);
});
exports.getTodoListById = getTodoListById;
const deleteTodoList = (todoListId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting todo list with ID ${todoListId} by user ${deletedBy}`);
        const deletedTodoList = yield todoListRepository.deleteTodoList(todoListId, deletedBy);
        if (!deletedTodoList) {
            throw new Error(`Todo list profile with ID ${todoListId} not found`);
        }
        return deletedTodoList;
    }
    catch (error) {
        throw new Error(`Error deleting todo list profile: ${error.message}`);
    }
});
exports.deleteTodoList = deleteTodoList;
const updateTodoListStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for todo list with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield todoListRepository.changeTodoListStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Todo list profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'todoList',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for todo list profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating todo list profile status: ${error.message}`);
    }
});
exports.updateTodoListStatus = updateTodoListStatus;
