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
exports.updateTaskModuleStatus = exports.deleteTaskModule = exports.getTaskModuleById = exports.getAllTaskModules = exports.editTaskModuleProfile = exports.createTaskModuleProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const taskModuleRepository = __importStar(require("./task-module.repository"));
const createTaskModuleProfile = (taskModuleData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new task module profile', { taskModuleData });
        if (!taskModuleData.name) {
            throw new Error('Task module name is required.');
        }
        if (!taskModuleData.nameAlias) {
            throw new Error('Task module name alias is required.');
        }
        const existingTaskModuleByName = yield taskModuleRepository.isNameExists(taskModuleData.name);
        const existingTaskModuleByAlias = yield taskModuleRepository.isNameAliasExists(taskModuleData.nameAlias);
        if (existingTaskModuleByName) {
            throw new Error('A task module with the same name already exists.');
        }
        if (existingTaskModuleByAlias) {
            throw new Error('A task module with the same name alias already exists.');
        }
        const newTaskModuleProfile = yield taskModuleRepository.create(taskModuleData);
        yield log_model_1.default.create({
            userId: newTaskModuleProfile.createdBy,
            module: 'taskModule',
            action: 'create',
            actionId: newTaskModuleProfile._id,
            description: `Created a new task module profile with name: ${newTaskModuleProfile.name}`,
        });
        return newTaskModuleProfile;
    }
    catch (error) {
        throw new Error(`Error creating task module profile: ${error.message}`);
    }
});
exports.createTaskModuleProfile = createTaskModuleProfile;
const editTaskModuleProfile = (taskModuleId, taskModuleData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing task module profile with ID ${taskModuleId}`, {
            taskModuleData,
        });
        if (taskModuleData.name) {
            const existingTaskModule = yield taskModuleRepository.isNameExists(taskModuleData.name, taskModuleId);
            if (existingTaskModule) {
                throw new Error('A task module with the same name already exists.');
            }
        }
        if (taskModuleData.nameAlias) {
            const existingTaskModule = yield taskModuleRepository.isNameAliasExists(taskModuleData.nameAlias, taskModuleId);
            if (existingTaskModule) {
                throw new Error('A task module with the same name alias already exists.');
            }
        }
        const updatedTaskModuleProfile = yield taskModuleRepository.updateById(taskModuleId, taskModuleData);
        if (!updatedTaskModuleProfile) {
            throw new Error(`Task module profile with ID ${taskModuleId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedTaskModuleProfile.userUpdatedBy,
            module: 'taskModule',
            action: 'edit',
            actionId: updatedTaskModuleProfile._id,
            description: `Updated task module profile with ID ${taskModuleId}`,
        });
        return updatedTaskModuleProfile;
    }
    catch (error) {
        throw new Error(`Error updating task module profile: ${error.message}`);
    }
});
exports.editTaskModuleProfile = editTaskModuleProfile;
const getAllTaskModules = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all task modules');
    return taskModuleRepository.getAllTaskModules();
});
exports.getAllTaskModules = getAllTaskModules;
const getTaskModuleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting task module with ID ${id}`);
    return taskModuleRepository.findById(id);
});
exports.getTaskModuleById = getTaskModuleById;
const deleteTaskModule = (taskModuleId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting task module with ID ${taskModuleId} by user ${deletedBy}`);
        const deletedTaskModule = yield taskModuleRepository.deleteTaskModule(taskModuleId, deletedBy);
        if (!deletedTaskModule) {
            throw new Error(`Task module profile with ID ${taskModuleId} not found`);
        }
        return deletedTaskModule;
    }
    catch (error) {
        throw new Error(`Error deleting task module profile: ${error.message}`);
    }
});
exports.deleteTaskModule = deleteTaskModule;
const updateTaskModuleStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for task module with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield taskModuleRepository.changeTaskModuleStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Task module profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'taskModule',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for task module profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating task module profile status: ${error.message}`);
    }
});
exports.updateTaskModuleStatus = updateTaskModuleStatus;
