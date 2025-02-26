import * as lookupCodeService from './lookupCodeServices';
import { Response } from 'express';
import { RequestWithAuthData } from '../../../@types/express';
import mongoose from 'mongoose';
import { CreateLookupCodeInput } from './lookupCodeServices';
import { message } from '../../../constants/responseMessage';

export const createLookupCode = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  const { type, name, code, firstNumber, lastNumber } = req.body;
  if (!req.userId) {
    res.status(401).json({ success: false, message: message.UNAUTHORIZED });
    return;
  }

  const createdBy: mongoose.Types.ObjectId = req.userId;

  try {
    const newLookupCode: CreateLookupCodeInput =
      await lookupCodeService.createLookupCode({
        type,
        name,
        code,
        firstNumber,
        lastNumber,
        createdBy,
      });

    res.status(201).json({
      success: true,
      message: message.LOOKUP_CODE_CREATED_SUCCESS, // Ensure this message exists in your message constants
      lookupCode: newLookupCode,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllLookupCodes = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const lookupCodes = await lookupCodeService.getAllLookupCodes();
    if (lookupCodes.length > 0) {
      res.status(200).json({ success: true, lookupCodes });
    } else {
      res.status(400).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_LOOKUP_CODES,
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error });
  }
};

export const getLookupCodeById = async (
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

    const lookupCode = await lookupCodeService.getLookupCodeById(id);

    if (!lookupCode) {
      return res
        .status(400)
        .json({ success: false, message: message.LOOKUP_CODE_NOT_FOUND });
    }

    res.status(200).json({ success: true, lookupCode });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const editLookupCode = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const lookupCodeData = {
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

    const existingLookupCode = await lookupCodeService.getLookupCodeById(id);
    if (!existingLookupCode) {
      return res
        .status(204)
        .json({ success: false, message: message.LOOKUP_CODE_NOT_FOUND });
    }

    const updatedLookupCode = await lookupCodeService.editLookupCode(
      id,
      lookupCodeData,
    );

    return res.status(200).json({
      success: true,
      message: message.LOOKUP_CODE_UPDATED_SUCCESS,
      lookupCode: updatedLookupCode,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteLookupCode = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      res.status(401).json({ success: false, message: message.UNAUTHORIZED });
      return;
    }

    const deletedLookupCode = await lookupCodeService.deleteLookupCode(
      id,
      req.userId,
    );
    if (!deletedLookupCode) {
      return res
        .status(204)
        .json({ success: false, message: message.LOOKUP_CODE_NOT_FOUND });
    }

    res
      .status(200)
      .json({ success: true, message: message.LOOKUP_CODE_DELETED });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Status update for lookup code
export const updateLookupCodeStatus = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedData = {
    status,
    userUpdatedBy: req.userId,
    userUpdatedDate: new Date(),
  };

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const updatedLookupCode = await lookupCodeService.updateLookupCodeStatus(
      id,
      updatedData,
      req.userId,
    );

    if (!updatedLookupCode) {
      return res
        .status(204)
        .json({ success: false, message: message.LOOKUP_CODE_NOT_FOUND });
    }

    return res
      .status(200)
      .json({ success: true, message: message.LOOKUP_CODE_STATUS_UPDATED });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
