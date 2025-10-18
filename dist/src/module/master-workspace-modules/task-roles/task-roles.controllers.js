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
exports.updateTaskRoleStatus = exports.getAllTaskRoles = exports.getTaskRoleById = exports.deleteTaskRole = exports.editTaskRole = exports.createTaskRole = void 0;
const taskRoleService = __importStar(require("./task-roles.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const team_members_services_1 = require("@src/module/master-manage-modules/team-members/team-members.services");
const industry_projects_services_1 = require("@src/module/master-workspace-modules/industry-projects/industry-projects.services");
const createTaskRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const taskName = req.body.taskName;
        const nameAlias = taskName
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.TASK_ROLE;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const taskRoleData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // const { error } = taskRoleValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        // Validate the getTeamMemberById
        const teamMember = yield (0, team_members_services_1.getTeamMemberById)(req.body.resourceName);
        if (!teamMember) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TEAM_MEMBER_NOT_FOUND,
            });
        }
        // Validate the getIndustryProjectById
        const industryProject = yield (0, industry_projects_services_1.getIndustryProjectById)(req.body.project);
        if (!industryProject) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_PROJECT_NOT_FOUND,
            });
        }
        // getTaskCustomerCount Validate the resourceName in taskRole
        const taskCustomerCount = yield taskRoleService.getTaskCustomerCount(req.body.resourceName);
        const count = typeof taskCustomerCount === 'object' &&
            taskCustomerCount !== null &&
            'count' in taskCustomerCount
            ? taskCustomerCount
            : taskCustomerCount;
        console.log('Parsed count:', count, 'Type:', typeof count);
        if (Number(count) > 3) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TASK_ROLE_RESOURCE_TASK_ALREADY_THREE,
            });
        }
        const createdTaskRole = yield taskRoleService.createTaskRole(taskRoleData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.TASK_ROLE_CREATED_SUCCESS,
            taskRole: createdTaskRole,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createTaskRole = createTaskRole;
const editTaskRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const taskRoleData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    //   const { error } = taskRoleValidation(req.body);
    //   if (error) {
    //     return next(respondError(getMessageFromValidationError(error)));
    //   }
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const taskRole = yield taskRoleService.getTaskRoleById(id);
        if (!taskRole) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TASK_ROLE_NOT_FOUND,
            });
        }
        if (req.body.taskName) {
            const taskName = req.body.taskName;
            const nameAlias = taskName
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            taskRoleData.nameAlias = nameAlias;
        }
        const updatedTaskRole = yield taskRoleService.editTaskRole(id, taskRoleData);
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TASK_ROLE_UPDATED_SUCCESS,
            taskRole: updatedTaskRole,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editTaskRole = editTaskRole;
const deleteTaskRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedTaskRole = yield taskRoleService.deleteTaskRole(id, req.userId);
        if (!deletedTaskRole) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TASK_ROLE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TASK_ROLE_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteTaskRole = deleteTaskRole;
const getTaskRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const taskRole = yield taskRoleService.getTaskRoleById(id);
        if (!taskRole) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TASK_ROLE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            taskRole,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getTaskRoleById = getTaskRoleById;
const getAllTaskRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const taskRoles = yield taskRoleService.getAllTaskRoles();
        if (taskRoles.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TASK_ROLE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            taskRoles,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllTaskRoles = getAllTaskRoles;
const updateTaskRoleStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: responseMessage_1.message.UNAUTHORIZED,
        });
    }
    const userStatusUpdateData = Object.assign(Object.assign({}, req.body), { userUpdatedBy: req.userId, userUpdatedDate: new Date() });
    try {
        const taskRole = yield taskRoleService.getTaskRoleById(id);
        if (!taskRole) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TASK_ROLE_NOT_FOUND,
            });
        }
        const updatedTaskRole = yield taskRoleService.updateTaskRoleStatus(id, userStatusUpdateData);
        if (!updatedTaskRole) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.TASK_ROLE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TASK_ROLE_STATUS_UPDATED,
            taskRole: updatedTaskRole,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateTaskRoleStatus = updateTaskRoleStatus;
// exports.updateTaskStatus = async (req, res) => {
//   try {
//       const taskId = req.params.id;
//       const { percentageOfCompleted, taskStatus } = req.body;
//       if (!percentageOfCompleted && !taskStatus) {
//           return res.status(400).json({
//               success: false,
//               message: 'At least one field (percentageOfCompleted or taskStatus) is required'
//           });
//       }
//       const updatedTask = await taskService.updateTaskStatus(
//           taskId,
//           { percentageOfCompleted, taskStatus }
//       );
//       res.status(200).json({
//           success: true,
//           data: updatedTask,
//           message: 'Task status updated successfully'
//       });
//   } catch (error) {
//       res.status(500).json({
//           success: false,
//           message: error.message
//       });
//   }
// };
