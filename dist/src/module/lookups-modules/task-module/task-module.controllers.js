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
exports.updateTaskModuleStatus = exports.getAllTaskModules = exports.getTaskModuleById = exports.deleteTaskModuleProfile = exports.editTaskModuleProfile = exports.createTaskModuleProfile = void 0;
const taskModuleService = __importStar(require("./task-module.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createTaskModuleProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.TASK_MODULE;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const taskModuleData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // Add Validation for TaskModule
        // const { error } = taskModuleValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdTaskModule = yield taskModuleService.createTaskModuleProfile(taskModuleData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.TASK_MODULE_CREATED_SUCCESS,
            taskModule: createdTaskModule,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createTaskModuleProfile = createTaskModuleProfile;
const editTaskModuleProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const taskModuleData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get TaskModule By Id from the database
        const taskModule = yield taskModuleService.getTaskModuleById(id);
        if (!taskModule) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TASK_MODULE_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            taskModuleData.nameAlias = nameAlias;
        }
        const existingTaskModule = yield taskModuleService.getTaskModuleById(id);
        if (!existingTaskModule) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TASK_MODULE_NOT_FOUND,
            });
        }
        const updatedTaskModule = yield taskModuleService.editTaskModuleProfile(id, taskModuleData);
        if (!updatedTaskModule) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TASK_MODULE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TASK_MODULE_UPDATED_SUCCESS,
            taskModule: updatedTaskModule,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editTaskModuleProfile = editTaskModuleProfile;
const deleteTaskModuleProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedTaskModule = yield taskModuleService.deleteTaskModule(id, req.userId);
        if (!deletedTaskModule) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TASK_MODULE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TASK_MODULE_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteTaskModuleProfile = deleteTaskModuleProfile;
const getTaskModuleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const taskModule = yield taskModuleService.getTaskModuleById(id);
        // TaskModule is not present in the database  400 "TaskModule Not Found Message"
        if (taskModule === null) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TASK_MODULE_NOT_FOUND,
            });
        }
        if (!taskModule) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TASK_MODULE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            taskModule,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getTaskModuleById = getTaskModuleById;
const getAllTaskModules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const taskModules = yield taskModuleService.getAllTaskModules();
        // TaskModule is not present in the database  400 "TaskModule Not Found Message"
        if (taskModules.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TASK_MODULE_NOT_FOUND,
            });
        }
        if (!taskModules) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_TASK_MODULE,
            });
        }
        return res.status(200).json({
            success: true,
            taskModules,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllTaskModules = getAllTaskModules;
const updateTaskModuleStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Get TaskModule By Id from the database
        const taskModule = yield taskModuleService.getTaskModuleById(id);
        if (!taskModule) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TASK_MODULE_NOT_FOUND,
            });
        }
        const updatedTaskModule = yield taskModuleService.updateTaskModuleStatus(id, userStatusUpdateData);
        if (!updatedTaskModule) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TASK_MODULE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TASK_MODULE_STATUS_UPDATED,
            taskModule: updatedTaskModule,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateTaskModuleStatus = updateTaskModuleStatus;
