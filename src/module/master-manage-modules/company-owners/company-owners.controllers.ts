import { RequestWithAuthData } from '../../../@types/express';
import * as companyOwnerServices from './company-owners.services';
import { NextFunction, Response } from 'express';
import { message } from '@constants/responseMessage';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
import { companyOwnersValidation } from '@validation/company-owners/company-owners.validation';
import { respondError } from '@src/helper/response';
import { getMessageFromValidationError } from '@src/helper/utils';

// Create Company Owner
export const createCompanyOwnerController = async (
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

    const lookupType = LookupTypes.COMPANY_OWNER;
    const code = await generateNewLookupCode(lookupType);

    const companyOwnerData = {
      code,
      ...req.body,
      createdBy: req.userId,
    };

    // Add Validation for CustomerType
    const { error } = companyOwnersValidation(req.body);
    if (error) {
      return next(respondError(getMessageFromValidationError(error)));
    }

    const phoneExists = await companyOwnerServices.isPhoneNumberExists(
      companyOwnerData.phone,
    );
    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: message.PHONE_NUMBER_ALREADY_EXISTS,
      });
    }
    
    const createdCompanyOwner =
      await companyOwnerServices.createCompanyOwnerServices(companyOwnerData);

    return res.status(201).json({
      success: true,
      message: message.COMPANY_OWNER_CREATED_SUCCESS,
      data: createdCompanyOwner,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCompanyOwnerController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const companyOwnerData = {
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

    // const emailExists = await companyOwnerServices.isEmailExists(
    //   companyOwnerData.email,
    // );
    // if (emailExists) {
    //   return res.status(400).json({
    //     success: false,
    //     message: message.EMAIL_EXISTS,
    //   });
    // }
    const existingCompanyOwner =
      await companyOwnerServices.getCompanyOwnerById(id);
    if (!existingCompanyOwner) {
      return res
        .status(204)
        .json({ success: false, message: message.COMPANY_OWNER_NOT_FOUND });
    }

    // if (companyOwnerData.password !== companyOwnerData.confirmPassword) {
    //   return res.status(400).json({
    //     success: false,
    //     message: message.PASSWORD_MISMATCH,
    //   });
    // }

    const updatedCompanyOwner = await companyOwnerServices.editCompanyOwner(
      id,
      companyOwnerData,
    );

    return res.status(200).json({
      success: true,
      message: message.COMPANY_OWNER_UPDATED_SUCCESS,
      companyOwner: updatedCompanyOwner,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCompanyOwnerController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      res.status(401).json({ success: false, message: message.UNAUTHORIZED });
      return;
    }

    const deletedCompanyOwner = await companyOwnerServices.deleteCompanyOwner(
      id,
      req.userId,
    );
    if (!deletedCompanyOwner) {
      return res
        .status(204)
        .json({ success: false, message: message.COMPANY_OWNER_NOT_FOUND });
    }

    res
      .status(200)
      .json({ success: true, message: message.COMPANY_OWNER_DELETED });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCompanyOwnerByIdController = async (
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
    const companyOwner = await companyOwnerServices.getCompanyOwnerById(id);

    if (!companyOwner) {
      return res
        .status(400)
        .json({ success: false, message: message.COMPANY_OWNER_NOT_FOUND });
    }

    if (!companyOwner) {
      return res
        .status(204)
        .json({ success: false, message: message.COMPANY_OWNER_NOT_FOUND });
    }

    res.status(200).json({ success: true, companyOwner });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllCompanyOwnersController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }
    const companyOwners = await companyOwnerServices.getAllCompanyOwners();

    // Company Owner Not Found
    if (!companyOwners.length) {
      return res.status(400).json({
        success: false,
        message: message.COMPANY_OWNER_NOT_FOUND,
      });
    }

    if (companyOwners) {
      res.status(200).json({ success: true, companyOwners });
    } else {
      res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_COMPANY_OWNERS,
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error });
  }
};

export const updateCompanyOwnerStatusController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const { status } = req.body;

  if (!req.userId) {
    return res.status(401).json({ message: message.UNAUTHORIZED });
  }

  const userModuleStatusUpdateData = {
    ...req.body,
    userUpdatedBy: req.userId,
    userUpdatedDate: new Date(),
  };

  try {
    const updatedModule = await companyOwnerServices.updateCompanyOwnerStatus(
      id,
      userModuleStatusUpdateData,
    );

    if (!updatedModule) {
      return res
        .status(404)
        .json({ success: false, message: message.COMPANY_OWNER_NOT_FOUND });
    }

    return res.status(200).json({
      success: true,
      message: message.COMPANY_OWNER_STATUS_UPDATED,
      data: updatedModule,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
