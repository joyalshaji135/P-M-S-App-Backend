import { NextFunction, Response } from 'express';
import * as priorityService from './priority.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { priorityValidation } from '@validation/priority/priority.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createPriorityProfile = async (
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
    const lookupType = LookupTypes.PRIORITY;
    const code = await generateNewLookupCode(lookupType);

    const priorityData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };

    // const { error } = priorityValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdPriority =
      await priorityService.createPriorityProfile(priorityData);

    return res.status(201).json({
      success: true,
      message: message.PRIORITY_CREATED_SUCCESS,
      priority: createdPriority,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editPriorityProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const priorityData = {
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

    const priority = await priorityService.getPriorityById(id);

    if (!priority) {
      return res.status(400).json({
        success: false,
        message: message.PRIORITY_NOT_FOUND,
      });
    }
    if (req.body.name) {
      const name = req.body.name;
      const nameAlias = name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, '');
      priorityData.nameAlias = nameAlias;
    }

    const updatedPriority = await priorityService.editPriorityProfile(
      id,
      priorityData,
    );

    if (!updatedPriority) {
      return res.status(204).json({
        success: false,
        message: message.PRIORITY_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.PRIORITY_UPDATED_SUCCESS,
      priority: updatedPriority,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePriorityProfile = async (
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

    const deletedPriority = await priorityService.deletePriority(
      id,
      req.userId,
    );

    if (!deletedPriority) {
      return res.status(204).json({
        success: false,
        message: message.PRIORITY_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.PRIORITY_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPriorityById = async (
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

    const priority = await priorityService.getPriorityById(id);

    if (!priority) {
      return res.status(400).json({
        success: false,
        message: message.PRIORITY_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      priority,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPriorities = async (
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

    const priorities = await priorityService.getAllPriorities();

    if (priorities.length === 0) {
      return res.status(400).json({
        success: false,
        message: message.PRIORITY_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      priorities,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePriorityStatus = async (
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

  const statusUpdateData = {
    ...req.body,
    userUpdatedBy: req.userId,
    userUpdatedDate: new Date(),
  };

  try {
    const priority = await priorityService.getPriorityById(id);

    if (!priority) {
      return res.status(400).json({
        success: false,
        message: message.PRIORITY_NOT_FOUND,
      });
    }

    const updatedPriority = await priorityService.updatePriorityStatus(
      id,
      statusUpdateData,
    );

    if (!updatedPriority) {
      return res.status(204).json({
        success: false,
        message: message.PRIORITY_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.PRIORITY_STATUS_UPDATED,
      priority: updatedPriority,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
