import { NextFunction, Response } from 'express';
import * as contactUsService from './contact-us.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { documentFileValidation } from '@validation/document-files/document-files.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

// addContactUs
export const addContactUs = async (
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
    const lookupType = LookupTypes.CONTACT_US;
    const code = await generateNewLookupCode(lookupType);

    const contactUsData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };

    const createdContactUs =
      await contactUsService.createContactUsProfile(contactUsData);

    return res.status(201).json({
      success: true,
      message: message.CONTACT_US_CREATED_SUCCESS,
      contactUs: createdContactUs,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getAllContactUs

export const getAllContactUs = async (
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
    const contactUs = await contactUsService.getAllContactUsProfile();
    return res.status(200).json({
      success: true,
      message: message.GET_ALL_CONTACT_US_SUCCESS,
      contactUs,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getContactUsById
export const getContactUsById = async (
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
    const contactUsId = req.params.contactUsId;
    const contactUs = await contactUsService.getContactUsById(contactUsId);
    if (!contactUs) {
      return res.status(404).json({
        success: false,
        message: message.CONTACT_US_NOT_FOUND,
      });
    }
    return res.status(200).json({
      success: true,
      message: message.GET_CONTACT_US_SUCCESS,
      contactUs,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// deleteContactUs
export const deleteContactUs = async (
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
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const contactUsId = req.params.contactUsId;
    const deletedContactUs =
      await contactUsService.deleteContactUs(contactUsId);
    if (!deletedContactUs) {
      return res.status(404).json({
        success: false,
        message: message.CONTACT_US_NOT_FOUND,
      });
    }
    return res.status(200).json({
      success: true,
      message: message.CONTACT_US_DELETED_SUCCESS,
      contactUs: deletedContactUs,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
