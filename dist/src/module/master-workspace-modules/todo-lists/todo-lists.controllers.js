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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoListStatus = exports.getAllTodoLists = exports.getTodoListById = exports.deleteTodoListProfile = exports.editTodoListProfile = exports.createTodoListProfile = void 0;
const todoListService = __importStar(require("./todo-lists.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createTodoListProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const titleName = req.body.titleName;
        const nameAlias = titleName
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.TODO_LIST;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const todoListData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // // Add Validation for TodoList
        // const { error } = todoListValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdTodoList = yield todoListService.createTodoListProfile(todoListData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.TODO_LIST_CREATED_SUCCESS,
            todoList: createdTodoList,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createTodoListProfile = createTodoListProfile;
const editTodoListProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todoListData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get TodoList By Id from the database
        const todoList = yield todoListService.getTodoListById(id);
        if (!todoList) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        if (req.body.titleName) {
            const titleName = req.body.titleName;
            const nameAlias = titleName
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            todoListData.nameAlias = nameAlias;
        }
        const existingTodoList = yield todoListService.getTodoListById(id);
        if (!existingTodoList) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        const updatedTodoList = yield todoListService.editTodoListProfile(id, todoListData);
        if (!updatedTodoList) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TODO_LIST_UPDATED_SUCCESS,
            todoList: updatedTodoList,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editTodoListProfile = editTodoListProfile;
const deleteTodoListProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedTodoList = yield todoListService.deleteTodoList(id, req.userId);
        if (!deletedTodoList) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TODO_LIST_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteTodoListProfile = deleteTodoListProfile;
const getTodoListById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const todoList = yield todoListService.getTodoListById(id);
        if (todoList === null) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        if (!todoList) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            todoList,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getTodoListById = getTodoListById;
const getAllTodoLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const todoLists = yield todoListService.getAllTodoLists();
        if (todoLists.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        if (!todoLists) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_TODO_LISTS,
            });
        }
        return res.status(200).json({
            success: true,
            todoLists,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllTodoLists = getAllTodoLists;
const updateTodoListStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: responseMessage_1.message.UNAUTHORIZED,
        });
    }
    console.log(req.userId);
    const userStatusUpdateData = Object.assign(Object.assign({}, req.body), { userUpdatedBy: req.userId, userUpdatedDate: new Date() });
    try {
        const todoList = yield todoListService.getTodoListById(id);
        if (!todoList) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        const updatedTodoList = yield todoListService.updateTodoListStatus(id, userStatusUpdateData);
        if (!updatedTodoList) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TODO_LIST_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TODO_LIST_STATUS_UPDATED,
            todoList: updatedTodoList,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateTodoListStatus = updateTodoListStatus;
