import { NextFunction, Response } from 'express';
import * as taskRoleService from './task-roles.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { taskRoleValidation } from '@validation/task-roles/task-roles.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';
import { getTeamMemberById } from '@src/module/master-manage-modules/team-members/team-members.services';
import { getIndustryProjectById } from '@src/module/master-workspace-modules/industry-projects/industry-projects.services';

export const createTaskRole = async (
  req: RequestWithAuthData,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const taskName = req.body.taskName;
    const nameAlias = taskName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/\./g, '');
    const lookupType = LookupTypes.TASK_ROLE;
    const code = await generateNewLookupCode(lookupType);

    const taskRoleData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };

    // const { error } = taskRoleValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    // Validate the getTeamMemberById

    const teamMember = await getTeamMemberById(req.body.resourceName);
    if (!teamMember) {
      return res.status(400).json({
        success: false,
        message: message.TEAM_MEMBER_NOT_FOUND,
      });
    }

    // Validate the getIndustryProjectById
    const industryProject = await getIndustryProjectById(req.body.project);
    if (!industryProject) {
      return res.status(400).json({
        success: false,
        message: message.INDUSTRY_PROJECT_NOT_FOUND,
      });
    }

    const createdTaskRole = await taskRoleService.createTaskRole(taskRoleData);

    return res.status(201).json({
      success: true,
      message: message.TASK_ROLE_CREATED_SUCCESS,
      taskRole: createdTaskRole,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editTaskRole = async (
  req: RequestWithAuthData,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { id } = req.params;
  const taskRoleData = {
    ...req.body,
    userUpdatedDate: new Date(),
    userUpdatedBy: req.userId,
  };
  //   const { error } = taskRoleValidation(req.body);
  //   if (error) {
  //     return next(respondError(getMessageFromValidationError(error)));
  //   }
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const taskRole = await taskRoleService.getTaskRoleById(id);
    if (!taskRole) {
      return res.status(400).json({
        success: false,
        message: message.TASK_ROLE_NOT_FOUND,
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

    const updatedTaskRole = await taskRoleService.editTaskRole(
      id,
      taskRoleData,
    );

    return res.status(200).json({
      success: true,
      message: message.TASK_ROLE_UPDATED_SUCCESS,
      taskRole: updatedTaskRole,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTaskRole = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const deletedTaskRole = await taskRoleService.deleteTaskRole(
      id,
      req.userId,
    );

    if (!deletedTaskRole) {
      return res.status(204).json({
        success: false,
        message: message.TASK_ROLE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.TASK_ROLE_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTaskRoleById = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const taskRole = await taskRoleService.getTaskRoleById(id);
    if (!taskRole) {
      return res.status(400).json({
        success: false,
        message: message.TASK_ROLE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      taskRole,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTaskRoles = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const taskRoles = await taskRoleService.getAllTaskRoles();
    if (taskRoles.length === 0) {
      return res.status(400).json({
        success: false,
        message: message.TASK_ROLE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      taskRoles,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTaskRoleStatus = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  const userStatusUpdateData = {
    ...req.body,
    userUpdatedBy: req.userId,
    userUpdatedDate: new Date(),
  };

  try {
    const taskRole = await taskRoleService.getTaskRoleById(id);

    if (!taskRole) {
      return res.status(400).json({
        success: false,
        message: message.TASK_ROLE_NOT_FOUND,
      });
    }

    const updatedTaskRole = await taskRoleService.updateTaskRoleStatus(
      id,
      userStatusUpdateData,
    );

    if (!updatedTaskRole) {
      return res.status(204).json({
        success: false,
        message: message.TASK_ROLE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.TASK_ROLE_STATUS_UPDATED,
      taskRole: updatedTaskRole,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
