import { NextFunction, Response } from 'express';
import * as industryProjectService from './industry-projects.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
import { industryProjectValidation } from '@validation/industry-projects/industry-projects.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';
import { getTeamManagerById } from '@src/module/master-manage-modules/team-managers/team-managers.services';
import { getTeamMemberById } from '@src/module/master-manage-modules/team-members/team-members.services';

export const createIndustryProject = async (
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
    const projectName = req.body.projectName;
    const nameAlias = projectName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/\./g, '');
    const lookupType = LookupTypes.INDUSTRY_PROJECT;
    const code = await generateNewLookupCode(lookupType);

    const industryProjectData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };

    const { error } = industryProjectValidation(req.body);
    if (error) {
      return next(respondError(getMessageFromValidationError(error)));
    }
    // Validate the getTeamMemberById and getTeamManagerById

    const teamManager = await getTeamManagerById(req.body.customer);
    if (!teamManager) {
      return res.status(400).json({
        success: false,
        message: message.TEAM_MANAGER_NOT_FOUND,
      });
    }

    const teamMember = await getTeamMemberById(req.body.customer);
    if (!teamMember) {
      return res.status(400).json({
        success: false,
        message: message.TEAM_MEMBER_NOT_FOUND,
      });
    }

    const createdIndustryProject =
      await industryProjectService.createIndustryProject(industryProjectData);

    return res.status(201).json({
      success: true,
      message: message.INDUSTRY_PROJECT_CREATED_SUCCESS,
      industryProject: createdIndustryProject,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editIndustryProject = async (
  req: RequestWithAuthData,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { id } = req.params;
  const industryProjectData = {
    ...req.body,
    userUpdatedDate: new Date(),
    userUpdatedBy: req.userId,
  };
  const { error } = industryProjectValidation(req.body);
  if (error) {
    return next(respondError(getMessageFromValidationError(error)));
  }
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const industryProject =
      await industryProjectService.getIndustryProjectById(id);
    if (!industryProject) {
      return res.status(400).json({
        success: false,
        message: message.INDUSTRY_PROJECT_NOT_FOUND,
      });
    }

    if (req.body.name) {
      const name = req.body.name;
      const nameAlias = name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, '');
      industryProjectData.nameAlias = nameAlias;
    }

    const updatedIndustryProject =
      await industryProjectService.editIndustryProject(id, industryProjectData);

    return res.status(200).json({
      success: true,
      message: message.INDUSTRY_PROJECT_UPDATED_SUCCESS,
      industryProject: updatedIndustryProject,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteIndustryProject = async (
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

    const deletedIndustryProject =
      await industryProjectService.deleteIndustryProject(id, req.userId);

    if (!deletedIndustryProject) {
      return res.status(204).json({
        success: false,
        message: message.INDUSTRY_PROJECT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.INDUSTRY_PROJECT_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getIndustryProjectById = async (
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

    const industryProject =
      await industryProjectService.getIndustryProjectById(id);
    if (!industryProject) {
      return res.status(400).json({
        success: false,
        message: message.INDUSTRY_PROJECT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      industryProject,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllIndustryProjects = async (
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

    const industryProjects =
      await industryProjectService.getAllIndustryProjects();
    if (industryProjects.length === 0) {
      return res.status(400).json({
        success: false,
        message: message.INDUSTRY_PROJECT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      industryProjects,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateIndustryProjectStatus = async (
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
    // Get IndustryProject By Id from the database
    const industryProject =
      await industryProjectService.getIndustryProjectById(id);

    if (!industryProject) {
      return res.status(400).json({
        success: false,
        message: message.INDUSTRY_PROJECT_NOT_FOUND,
      });
    }
    const updatedIndustryProject =
      await industryProjectService.updateIndustryProjectStatus(
        id,
        userStatusUpdateData,
      );

    if (!updatedIndustryProject) {
      return res.status(204).json({
        success: false,
        message: message.INDUSTRY_PROJECT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.INDUSTRY_PROJECT_STATUS_UPDATED,
      industryProject: updatedIndustryProject,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
