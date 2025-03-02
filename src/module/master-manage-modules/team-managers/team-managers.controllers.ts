import { RequestWithAuthData } from '../../../@types/express';
import * as teamManagerServices from './team-managers.services';
import { NextFunction, Response } from 'express';
import { message } from '@constants/responseMessage';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
import { teamManagersValidation } from '@validation/team-managers/team-managers.validation';
import { respondError } from '@src/helper/response';
import { getMessageFromValidationError } from '@src/helper/utils';

// Create Team Manager
export const createTeamManagerController = async (
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

    const lookupType = LookupTypes.TEAM_MANAGER;
    const code = await generateNewLookupCode(lookupType);

    const teamManagerData = {
      code,
      ...req.body,
      createdBy: req.userId,
    };
    const { error } = teamManagersValidation(req.body);
    if (error) {
      return next(respondError(getMessageFromValidationError(error)));
    }

    const phoneExists = await teamManagerServices.isPhoneNumberExists(
      teamManagerData.phone,
    );
    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: message.PHONE_NUMBER_ALREADY_EXISTS,
      });
    }

    if (teamManagerData.password !== teamManagerData.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: message.PASSWORD_MISMATCH,
      });
    }

    const createdTeamManager =
      await teamManagerServices.createTeamManagerServices(teamManagerData);

    return res.status(201).json({
      success: true,
      message: message.TEAM_MANAGER_CREATED_SUCCESS,
      data: createdTeamManager,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update Team Manager
export const updateTeamManagerController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const teamManagerData = {
    ...req.body,
    userUpdatedDate: new Date(),
    userUpdatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const existingTeamManager =
      await teamManagerServices.getTeamManagerById(id);
    // 400 bad request
    if (!existingTeamManager) {
      return res
        .status(400)
        .json({ success: false, message: message.TEAM_MANAGER_NOT_FOUND });
    }

    const emailExists = await teamManagerServices.isEmailExists(
      teamManagerData.email,
    );
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: message.EMAIL_EXISTS,
      });
    }

    if (!existingTeamManager) {
      return res
        .status(204)
        .json({ success: false, message: message.TEAM_MANAGER_NOT_FOUND });
    }

    if (teamManagerData.password !== teamManagerData.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: message.PASSWORD_MISMATCH,
      });
    }

    const updatedTeamManager = await teamManagerServices.editTeamManager(
      id,
      teamManagerData,
    );

    return res.status(200).json({
      success: true,
      message: message.TEAM_MANAGER_UPDATED_SUCCESS,
      teamManager: updatedTeamManager,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Team Manager
export const deleteTeamManagerController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const deletedTeamManager = await teamManagerServices.deleteTeamManager(
      id,
      req.userId,
    );
    if (!deletedTeamManager) {
      return res
        .status(204)
        .json({ success: false, message: message.TEAM_MANAGER_NOT_FOUND });
    }

    res
      .status(200)
      .json({ success: true, message: message.TEAM_MANAGER_DELETED });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Team Manager by ID
export const getTeamManagerByIdController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const teamManager = await teamManagerServices.getTeamManagerById(id);

    if (teamManager === null) {
      return res
        .status(400)
        .json({ success: false, message: message.TEAM_MANAGER_NOT_FOUND });
    }

    if (!teamManager) {
      return res
        .status(204)
        .json({ success: false, message: message.TEAM_MANAGER_NOT_FOUND });
    }

    res.status(200).json({ success: true, teamManager });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Team Managers
export const getAllTeamManagersController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const teamManagers = await teamManagerServices.getAllTeamManagers();

    if (!teamManagers.length) {
      return res.status(400).json({
        success: false,
        message: message.TEAM_MANAGER_NOT_FOUND,
      });
    }

    res.status(200).json({ success: true, teamManagers });
  } catch (error: any) {
    res.status(500).json({ success: false, error });
  }
};

// Update Team Manager Status
export const updateTeamManagerStatusController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: message.UNAUTHORIZED });
  }

  const userModuleStatusUpdateData = {
    ...req.body,
    userUpdatedBy: req.userId,
    userUpdatedDate: new Date(),
  };

  try {
    const existingTeamManager =
      await teamManagerServices.getTeamManagerById(id);
    // 400 bad request
    if (!existingTeamManager) {
      return res
        .status(400)
        .json({ success: false, message: message.TEAM_MANAGER_NOT_FOUND });
    }

    const updatedModule = await teamManagerServices.updateTeamManagerStatus(
      id,
      userModuleStatusUpdateData,
    );

    if (!updatedModule) {
      return res
        .status(404)
        .json({ success: false, message: message.TEAM_MANAGER_NOT_FOUND });
    }

    return res.status(200).json({
      success: true,
      message: message.TEAM_MANAGER_STATUS_UPDATED,
      data: updatedModule,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
