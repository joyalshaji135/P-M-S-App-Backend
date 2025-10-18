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
exports.updateTaskRoleStatus = exports.deleteTaskRole = exports.getTaskRoleById = exports.getAllTaskRoles = exports.editTaskRole = exports.getTaskCustomerCount = exports.createTaskRole = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const taskRoleRepository = __importStar(require("./task-roles.repository"));
const createTaskRole = (taskRoleData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new task role profile', {
            taskRoleData,
        });
        if (!taskRoleData.taskName) {
            throw new Error('Task role name is required.');
        }
        if (!taskRoleData.nameAlias) {
            throw new Error('Task role name alias is required.');
        }
        const existingTaskRoleByName = yield taskRoleRepository.isNameExists(taskRoleData.taskName);
        const existingTaskRoleByAlias = yield taskRoleRepository.isNameAliasExists(taskRoleData.nameAlias);
        if (existingTaskRoleByName) {
            throw new Error('A task role with the same name already exists.');
        }
        if (existingTaskRoleByAlias) {
            throw new Error('A task role with the same name alias already exists.');
        }
        const newTaskRoleProfile = yield taskRoleRepository.create(taskRoleData);
        yield log_model_1.default.create({
            userId: newTaskRoleProfile.createdBy,
            module: 'taskRole',
            action: 'create',
            actionId: newTaskRoleProfile._id,
            description: `Created a new task role profile with name: ${newTaskRoleProfile.taskName}`,
        });
        return newTaskRoleProfile;
    }
    catch (error) {
        throw new Error(`Error creating task role profile: ${error.message}`);
    }
});
exports.createTaskRole = createTaskRole;
// getTaskCustomerCount
const getTaskCustomerCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return taskRoleRepository.getTaskCustomerCount(id);
});
exports.getTaskCustomerCount = getTaskCustomerCount;
const editTaskRole = (taskRoleId, taskRoleData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing task role profile with ID ${taskRoleId}`, {
            taskRoleData,
        });
        if (taskRoleData.taskName) {
            const existingTaskRole = yield taskRoleRepository.isNameExists(taskRoleData.taskName, taskRoleId);
            if (existingTaskRole) {
                throw new Error('A task role with the same name already exists.');
            }
        }
        if (taskRoleData.nameAlias) {
            const existingTaskRole = yield taskRoleRepository.isNameAliasExists(taskRoleData.nameAlias, taskRoleId);
            if (existingTaskRole) {
                throw new Error('A task role with the same name alias already exists.');
            }
        }
        const updatedTaskRoleProfile = yield taskRoleRepository.updateById(taskRoleId, taskRoleData);
        if (!updatedTaskRoleProfile) {
            throw new Error(`Task role profile with ID ${taskRoleId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedTaskRoleProfile.userUpdatedBy,
            module: 'taskRole',
            action: 'edit',
            actionId: updatedTaskRoleProfile._id,
            description: `Updated task role profile with ID ${taskRoleId}`,
        });
        return updatedTaskRoleProfile;
    }
    catch (error) {
        throw new Error(`Error updating task role profile: ${error.message}`);
    }
});
exports.editTaskRole = editTaskRole;
const getAllTaskRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all task roles');
    return taskRoleRepository.getAllTaskRoles();
});
exports.getAllTaskRoles = getAllTaskRoles;
const getTaskRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting task role with ID ${id}`);
    return taskRoleRepository.findById(id);
});
exports.getTaskRoleById = getTaskRoleById;
const deleteTaskRole = (taskRoleId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting task role with ID ${taskRoleId} by user ${deletedBy}`);
        const deletedTaskRole = yield taskRoleRepository.deleteTaskRole(taskRoleId, deletedBy);
        if (!deletedTaskRole) {
            throw new Error(`Task role profile with ID ${taskRoleId} not found`);
        }
        return deletedTaskRole;
    }
    catch (error) {
        throw new Error(`Error deleting task role profile: ${error.message}`);
    }
});
exports.deleteTaskRole = deleteTaskRole;
const updateTaskRoleStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for task role with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield taskRoleRepository.changeTaskRoleStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Task role profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'taskRole',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for task role profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating task role profile status: ${error.message}`);
    }
});
exports.updateTaskRoleStatus = updateTaskRoleStatus;
// exports.updateTaskStatus = async (taskId, updateFields) => {
//   try {
//       // Filter out undefined fields
//       const fieldsToUpdate = {};
//       if (updateFields.percentageOfCompleted !== undefined) {
//           fieldsToUpdate.percentageOfCompleted = updateFields.percentageOfCompleted;
//       }
//       if (updateFields.taskStatus !== undefined) {
//           fieldsToUpdate.taskStatus = updateFields.taskStatus;
//       }
//       // Add updatedAt timestamp
//       fieldsToUpdate.updatedAt = new Date();
//       const updatedTask = await taskRepository.findByIdAndUpdate(
//           taskId,
//           fieldsToUpdate,
//           { new: true }
//       );
//       if (!updatedTask) {
//           throw new Error('Task not found');
//       }
//       return updatedTask;
//   } catch (error) {
//       throw error;
//   }
// };
