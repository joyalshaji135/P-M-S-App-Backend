import { NextFunction, Response } from 'express';
import * as alertModeService from './alert-modes.services'; // Update the import path
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { alertModeValidation } from '@validation/alert-modes/alert-modes.validation'; // Uncomment if validation is needed
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createAlertModeProfile = async (
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

    const { code, message: alertMessage, severity, customer } = req.body;

    // Generate a new lookup code if needed
    const lookupType = LookupTypes.ALERT_MODE; // Update the lookup type if necessary
    const generatedCode = await generateNewLookupCode(lookupType);

    const alertModeData = {
      code: generatedCode,
      message: alertMessage,
      severity,
      customer,
      createdBy: req.userId,
      triggeredAt: new Date(),
    };

    // Uncomment if validation is needed
    // const { error } = alertModeValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdAlertMode =
      await alertModeService.createAlertModeProfile(alertModeData);

    return res.status(201).json({
      success: true,
      message: message.ALERT_MODE_CREATED_SUCCESS, // Update the success message
      alertMode: createdAlertMode,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editAlertModeProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const alertModeData = {
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

    // Get AlertMode By Id from the database
    const alertMode = await alertModeService.getAlertModeById(id);

    if (!alertMode) {
      return res.status(400).json({
        success: false,
        message: message.ALERT_MODE_NOT_FOUND, // Update the error message
      });
    }

    const existingAlertMode = await alertModeService.getAlertModeById(id);
    if (!existingAlertMode) {
      return res.status(204).json({
        success: false,
        message: message.ALERT_MODE_NOT_FOUND, // Update the error message
      });
    }

    const updatedAlertMode = await alertModeService.editAlertModeProfile(
      id,
      alertModeData,
    );

    if (!updatedAlertMode) {
      return res.status(204).json({
        success: false,
        message: message.ALERT_MODE_NOT_FOUND, // Update the error message
      });
    }

    return res.status(200).json({
      success: true,
      message: message.ALERT_MODE_UPDATED_SUCCESS, // Update the success message
      alertMode: updatedAlertMode,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAlertModeProfile = async (
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

    const deletedAlertMode = await alertModeService.deleteAlertMode(
      id,
      req.userId,
    );

    if (!deletedAlertMode) {
      return res.status(204).json({
        success: false,
        message: message.ALERT_MODE_NOT_FOUND, // Update the error message
      });
    }

    return res.status(200).json({
      success: true,
      message: message.ALERT_MODE_DELETED, // Update the success message
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllAlertModes = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    const alertModes = await alertModeService.getAllAlertModes();

    return res.status(200).json({
      success: true,
      message: message.ALERT_MODES_FETCHED_SUCCESS, // Update the success message
      alertModes,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAlertModeById = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    const alertMode = await alertModeService.getAlertModeById(id);

    if (!alertMode) {
      return res.status(404).json({
        success: false,
        message: message.ALERT_MODE_NOT_FOUND, // Update the error message
      });
    }

    return res.status(200).json({
      success: true,
      message: message.ALERT_MODE_FETCHED_SUCCESS, // Update the success message
      alertMode,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAlertModeStatus = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const { alertStatus, userUpdatedBy } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const updatedAlertMode = await alertModeService.updateAlertModeStatus(id, {
      alertStatus,
      userUpdatedBy: req.userId,
      userUpdatedDate: new Date(),
    });

    if (!updatedAlertMode) {
      return res.status(404).json({
        success: false,
        message: message.ALERT_MODE_NOT_FOUND, // Update the error message
      });
    }

    return res.status(200).json({
      success: true,
      message: message.ALERT_MODE_STATUS_UPDATED, // Update the success message
      alertMode: updatedAlertMode,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
