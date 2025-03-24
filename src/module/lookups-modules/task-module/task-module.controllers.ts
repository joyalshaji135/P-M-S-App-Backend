import { NextFunction, Response } from 'express';
import * as taskModuleService from './task-module.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { taskModuleValidation } from '@validation/task-modules/task-modules.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createTaskModuleProfile = async (
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
    const name = req.body.name;
    const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
    const lookupType = LookupTypes.TASK_MODULE;
    const code = await generateNewLookupCode(lookupType);

    const taskModuleData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };
    // Add Validation for TaskModule
    // const { error } = taskModuleValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdTaskModule = await taskModuleService.createTaskModuleProfile(taskModuleData);

    return res.status(201).json({
      success: true,
      message: message.TASK_MODULE_CREATED_SUCCESS,
      taskModule: createdTaskModule,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editTaskModuleProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const taskModuleData = {
    ...req.body,
    userUpdatedDate: new Date(),
    userUpdatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    // Get TaskModule By Id from the database
    const taskModule = await taskModuleService.getTaskModuleById(id);

    if (!taskModule) {
      return res.status(400).json({
        success: false,
        message: message.TASK_MODULE_NOT_FOUND,
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

    const existingTaskModule = await taskModuleService.getTaskModuleById(id);
    if (!existingTaskModule) {
      return res.status(204).json({
        success: false,
        message: message.TASK_MODULE_NOT_FOUND,
      });
    }

    const updatedTaskModule = await taskModuleService.editTaskModuleProfile(
      id,
      taskModuleData,
    );

    if (!updatedTaskModule) {
      return res.status(204).json({
        success: false,
        message: message.TASK_MODULE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.TASK_MODULE_UPDATED_SUCCESS,
      taskModule: updatedTaskModule,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTaskModuleProfile = async (
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

    const deletedTaskModule = await taskModuleService.deleteTaskModule(id, req.userId);

    if (!deletedTaskModule) {
      return res.status(204).json({
        success: false,
        message: message.TASK_MODULE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.TASK_MODULE_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTaskModuleById = async (
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

    const taskModule = await taskModuleService.getTaskModuleById(id);

    // TaskModule is not present in the database  400 "TaskModule Not Found Message"

    if (taskModule === null) {
      return res.status(400).json({
        success: false,
        message: message.TASK_MODULE_NOT_FOUND,
      });
    }

    if (!taskModule) {
      return res.status(204).json({
        success: false,
        message: message.TASK_MODULE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      taskModule,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTaskModules = async (
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

    const taskModules = await taskModuleService.getAllTaskModules();

    // TaskModule is not present in the database  400 "TaskModule Not Found Message"

    if (taskModules.length === 0) {
      return res.status(400).json({
        success: false,
        message: message.TASK_MODULE_NOT_FOUND,
      });
    }

    if (!taskModules) {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_TASK_MODULE,
      });
    }

    return res.status(200).json({
      success: true,
      taskModules,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTaskModuleStatus = async (
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
  console.log(req.userId);
  const userStatusUpdateData = {
    ...req.body,
    userUpdatedBy: req.userId,
    userUpdatedDate: new Date(),
  };
  try {
    // Get TaskModule By Id from the database
    const taskModule = await taskModuleService.getTaskModuleById(id);

    if (!taskModule) {
      return res.status(400).json({
        success: false,
        message: message.TASK_MODULE_NOT_FOUND,
      });
    }
    const updatedTaskModule = await taskModuleService.updateTaskModuleStatus(
      id,
      userStatusUpdateData,
    );

    if (!updatedTaskModule) {
      return res.status(204).json({
        success: false,
        message: message.TASK_MODULE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.TASK_MODULE_STATUS_UPDATED,
      taskModule: updatedTaskModule,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};