import { NextFunction, Response } from 'express';
import * as domainService from './domain.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { domainValidation } from '@validation/domains/domains.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createDomainProfile = async (
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
    const lookupType = LookupTypes.DOMAIN;
    const code = await generateNewLookupCode(lookupType);

    const domainData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };
    // Add Validation for Domain
    // const { error } = domainValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdDomain = await domainService.createDomainProfile(domainData);

    return res.status(201).json({
      success: true,  
      message: message.DOMAIN_CREATED_SUCCESS,
      domain: createdDomain,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editDomainProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const domainData = {
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
    // Get Domain By Id from the database
    const domain = await domainService.getDomainById(id);

    if (!domain) {
      return res.status(400).json({
        success: false,
        message: message.DOMAIN_NOT_FOUND,
      });
    }
    if (req.body.name) {
      const name = req.body.name;
      const nameAlias = name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, '');
      domainData.nameAlias = nameAlias;
    }

    const existingDomain = await domainService.getDomainById(id);
    if (!existingDomain) {
      return res.status(204).json({
        success: false,
        message: message.DOMAIN_NOT_FOUND,
      });
    }

    const updatedDomain = await domainService.editDomainProfile(id, domainData);

    if (!updatedDomain) {
      return res.status(204).json({
        success: false,
        message: message.DOMAIN_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.DOMAIN_UPDATED_SUCCESS,
      domain: updatedDomain,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDomainProfile = async (
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

    const deletedDomain = await domainService.deleteDomain(id, req.userId);

    if (!deletedDomain) {
      return res.status(204).json({
        success: false,
        message: message.DOMAIN_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.DOMAIN_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDomainById = async (
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

    const domain = await domainService.getDomainById(id);

    // Domain is not present in the database  400 "Domain Not Found Message"

    if (domain === null) {
      return res.status(400).json({
        success: false,
        message: message.DOMAIN_NOT_FOUND,
      });
    }

    if (!domain) {
      return res.status(204).json({
        success: false,
        message: message.DOMAIN_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      domain,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDomains = async (
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

    const domains = await domainService.getAllDomains();

    // Domain is not present in the database  400 "Domain Not Found Message"

    if (domains.length === 0) {
      return res.status(400).json({
        success: false,
        message: message.DOMAIN_NOT_FOUND,
      });
    }

    if (!domains) {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_DOMAINS,
      });
    }

    return res.status(200).json({
      success: true,
      domains,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDomainStatus = async (
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
    // Get Domain By Id from the database
    const domain = await domainService.getDomainById(id);

    if (!domain) {
      return res.status(400).json({
        success: false,
        message: message.DOMAIN_NOT_FOUND,
      });
    }
    const updatedDomain = await domainService.updateDomainStatus(
      id,
      userStatusUpdateData,
    );

    if (!updatedDomain) {
      return res.status(204).json({
        success: false,
        message: message.DOMAIN_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.DOMAIN_STATUS_UPDATED,
      domain: updatedDomain,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
