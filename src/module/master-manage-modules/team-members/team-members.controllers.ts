import { RequestWithAuthData } from '../../../@types/express';
import * as teamMemberServices from './team-members.services';
import { NextFunction, Response } from 'express';
import { message } from '@constants/responseMessage';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
import { teamMembersValidation } from '@validation/team-members/team-members.validation';
import { respondError } from '@src/helper/response';
import { getMessageFromValidationError } from '@src/helper/utils';

// Create Team Member
export const createTeamMemberController = async (
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

    const lookupType = LookupTypes.TEAM_MEMBER;
    const code = await generateNewLookupCode(lookupType);

    const teamMemberData = {
      code,
      ...req.body,
      createdBy: req.userId,
    };

    const { error } = teamMembersValidation(req.body);
    if (error) {
      return next(respondError(getMessageFromValidationError(error)));
    }

    const phoneExists = await teamMemberServices.isPhoneNumberExists(
      teamMemberData.phone,
    );
    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: message.PHONE_NUMBER_ALREADY_EXISTS,
      });
    }

    if (teamMemberData.password !== teamMemberData.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: message.PASSWORD_MISMATCH,
      });
    }

    const createdTeamMember = await teamMemberServices.createTeamMemberServices(teamMemberData);

    return res.status(201).json({
      success: true,
      message: message.TEAM_MEMBER_CREATED_SUCCESS,
      data: createdTeamMember,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update Team Member
export const updateTeamMemberController = async (req: RequestWithAuthData, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params;
  const teamMemberData = {
    ...req.body,
    userUpdatedDate: new Date(),
    userUpdatedBy: req.userId,
  };

  const { error } = teamMembersValidation(req.body);
    if (error) {
      return next(respondError(getMessageFromValidationError(error)));
    }
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: message.UNAUTHORIZED });
    }

    const existingTeamMember = await teamMemberServices.getTeamMemberById(id);
    if (!existingTeamMember) {
      return res.status(400).json({ success: false, message: message.TEAM_MEMBER_NOT_FOUND });
    }

    const emailExists = await teamMemberServices.isEmailExists(teamMemberData.email);
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: message.EMAIL_EXISTS,
      });
    }

    if (teamMemberData.password !== teamMemberData.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: message.PASSWORD_MISMATCH,
      });
    }

    const updatedTeamMember = await teamMemberServices.editTeamMember(id, teamMemberData);

    return res.status(200).json({
      success: true,
      message: message.TEAM_MEMBER_UPDATED_SUCCESS,
      teamMember: updatedTeamMember,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Team Member
export const deleteTeamMemberController = async (req: RequestWithAuthData, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: message.UNAUTHORIZED });
    }

    const deletedTeamMember = await teamMemberServices.deleteTeamMember(id, req.userId);
    if (!deletedTeamMember) {
      return res.status(204).json({ success: false, message: message.TEAM_MEMBER_NOT_FOUND });
    }

    res.status(200).json({ success: true, message: message.TEAM_MEMBER_DELETED });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Team Member by ID
export const getTeamMemberByIdController = async (req: RequestWithAuthData, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: message.UNAUTHORIZED });
    }

    const teamMember = await teamMemberServices.getTeamMemberById(id);
    
    if (teamMember === null) {
      return res.status(400).json({ success: false, message: message.TEAM_MEMBER_NOT_FOUND });
    }

    res.status(200).json({ success: true, teamMember });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Team Members
export const getAllTeamMembersController = async (req: RequestWithAuthData, res: Response): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: message.UNAUTHORIZED });
    }

    const teamMembers = await teamMemberServices.getAllTeamMembers();

    if (!teamMembers.length) {
      return res.status(400).json({
        success: false,
        message: message.TEAM_MEMBER_NOT_FOUND,
      });
    }

    res.status(200).json({ success: true, teamMembers });
  } catch (error: any) {
    res.status(500).json({ success: false, error });
  }
};

// Update Team Member Status
export const updateTeamMemberStatusController = async (req: RequestWithAuthData, res: Response): Promise<any> => {
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
    const existingTeamMember = await teamMemberServices.getTeamMemberById(id);
    if (!existingTeamMember) {
      return res.status(400).json({ success: false, message: message.TEAM_MEMBER_NOT_FOUND });
    }

    const updatedModule = await teamMemberServices.updateTeamMemberStatus(
      id,
      userModuleStatusUpdateData,
    );

    if (!updatedModule) {
      return res.status(404).json({ success: false, message: message.TEAM_MEMBER_NOT_FOUND });
    }

    return res.status(200).json({
      success: true,
      message: message.TEAM_MEMBER_STATUS_UPDATED,
      data: updatedModule,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
