import { NextFunction, Response } from 'express';
import * as industryNatureService from './industry-nature.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { industryNatureValidation } from '@validation/industry-natures/industry-natures.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createIndustryNatureProfile = async (
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
    const lookupType = LookupTypes.INDUSTRY_NATURE;
    const code = await generateNewLookupCode(lookupType);

    const industryNatureData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };
    // Add Validation for IndustryNature
    // const { error } = industryNatureValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdIndustryNature =
      await industryNatureService.createIndustryNatureProfile(industryNatureData);

    return res.status(201).json({
      success: true,
      message: message.INDUSTRY_NATURE_CREATES_SUCCESS,
      industryNature: createdIndustryNature,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editIndustryNatureProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const industryNatureData = {
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
    // Get IndustryNature By Id from the database
    const industryNature = await industryNatureService.getIndustryNatureById(id);

    if (!industryNature) {
      return res.status(400).json({
        success: false,
        message: message.INDUSTRY_NATURE_NOT_FOUND,
      });
    }
    if (req.body.name) {
      const name = req.body.name;
      const nameAlias = name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, '');
      industryNatureData.nameAlias = nameAlias;
    }

    const existingIndustryNature =
      await industryNatureService.getIndustryNatureById(id);
    if (!existingIndustryNature) {
      return res.status(204).json({
        success: false,
        message: message.INDUSTRY_NATURE_NOT_FOUND,
      });
    }

    const updatedIndustryNature =
      await industryNatureService.editIndustryNatureProfile(
        id,
        industryNatureData,
      );

    if (!updatedIndustryNature) {
      return res.status(204).json({
        success: false,
        message: message.INDUSTRY_NATURE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.INDUSTRY_NATURE_UPDATED_SUCCESS,
      industryNature: updatedIndustryNature,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteIndustryNatureProfile = async (
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

    const deletedIndustryNature =
      await industryNatureService.deleteIndustryNature(id, req.userId);

    if (!deletedIndustryNature) {
      return res.status(204).json({
        success: false,
        message: message.INDUSTRY_NATURE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.INDUSTRY_NATURE_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getIndustryNatureById = async (
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

    const industryNature = await industryNatureService.getIndustryNatureById(id);

    // IndustryNature is not present in the database  400 "IndustryNature Not Found Message"

    if (industryNature === null) {
      return res.status(400).json({
        success: false,
        message: message.INDUSTRY_NATURE_NOT_FOUND,
      });
    }

    if (!industryNature) {
      return res.status(204).json({
        success: false,
        message: message.INDUSTRY_NATURE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      industryNature,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllIndustryNatures = async (
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

    const industryNatures =
      await industryNatureService.getAllIndustryNatures();

    // IndustryNature is not present in the database  400 "IndustryNature Not Found Message"

    if (industryNatures.length === 0) {
      return res.status(400).json({
        success: false,
        message: message.INDUSTRY_NATURE_NOT_FOUND,
      });
    }

    if (!industryNatures) {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_INDUSTRY_PROJECTS,
      });
    }

    return res.status(200).json({
      success: true,
      industryNatures,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateIndustryNatureStatus = async (
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
    // Get IndustryNature By Id from the database
    const industryNature = await industryNatureService.getIndustryNatureById(id);

    if (!industryNature) {
      return res.status(400).json({
        success: false,
        message: message.INDUSTRY_NATURE_NOT_FOUND,
      });
    }
    const updatedIndustryNature =
      await industryNatureService.updateIndustryNatureStatus(
        id,
        userStatusUpdateData,
      );

    if (!updatedIndustryNature) {
      return res.status(204).json({
        success: false,
        message: message.INDUSTRY_NATURE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.INDUSTRY_NATURE_STATUS_UPDATED,
      industryNature: updatedIndustryNature,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};