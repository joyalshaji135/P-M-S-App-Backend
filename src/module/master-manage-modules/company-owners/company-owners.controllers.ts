import mongoose from 'mongoose';
import { RequestWithAuthData } from '../../../@types/express';
import * as companyOwnerServices from './company-owners.services';
import { NextFunction, Response } from 'express';
import { message } from '@constants/responseMessage';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';

export const createCompanyOwnerController = async (
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

    const lookupType = LookupTypes.COMPANY_OWNER;
    const code = await generateNewLookupCode(lookupType);

    const companyOwnerData = {
      code,
      ...req.body,
      createdBy: req.userId,
    };

    const phoneExists = await companyOwnerServices.isPhoneNumberExists(
      companyOwnerData.phone,
    );
    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: message.PHONE_NUMBER_ALREADY_EXISTS,
      });
    }

    if (companyOwnerData.password !== companyOwnerData.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: message.PASSWORD_MISMATCH,
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
