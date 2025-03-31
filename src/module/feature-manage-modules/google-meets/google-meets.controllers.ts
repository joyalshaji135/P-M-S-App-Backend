import { NextFunction, Response } from 'express';
import * as googleMeetService from './google-meets.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { googleMeetValidation } from '@validation/google-meet/google-meet.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createGoogleMeetProfile = async (
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
    const lookupType = LookupTypes.GOOGLE_MEET;
    const code = await generateNewLookupCode(lookupType);

    const googleMeetData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };
    // Add Validation for GoogleMeet
    // const { error } = googleMeetValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdGoogleMeet =
      await googleMeetService.createGoogleMeetProfile(googleMeetData);

    return res.status(201).json({
      success: true,
      message: message.GOOGLE_MEET_CREATED_SUCCESS,
      googleMeet: createdGoogleMeet,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editGoogleMeetProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const googleMeetData = {
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
    // Get GoogleMeet By Id from the database
    const googleMeet = await googleMeetService.getGoogleMeetById(id);

    if (!googleMeet) {
      return res.status(400).json({
        success: false,
        message: message.GOOGLE_MEET_NOT_FOUND,
      });
    }
    if (req.body.name) {
      const name = req.body.name;
      const nameAlias = name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, '');
      googleMeetData.nameAlias = nameAlias;
    }

    const existingGoogleMeet = await googleMeetService.getGoogleMeetById(id);
    if (!existingGoogleMeet) {
      return res.status(204).json({
        success: false,
        message: message.GOOGLE_MEET_NOT_FOUND,
      });
    }

    const updatedGoogleMeet = await googleMeetService.editGoogleMeetProfile(
      id,
      googleMeetData,
    );

    if (!updatedGoogleMeet) {
      return res.status(204).json({
        success: false,
        message: message.GOOGLE_MEET_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.GOOGLE_MEET_UPDATED_SUCCESS,
      googleMeet: updatedGoogleMeet,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteGoogleMeetProfile = async (
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

    const deletedGoogleMeet = await googleMeetService.deleteGoogleMeet(
      id,
      req.userId,
    );

    if (!deletedGoogleMeet) {
      return res.status(204).json({
        success: false,
        message: message.GOOGLE_MEET_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.GOOGLE_MEET_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getGoogleMeetById = async (
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

    const googleMeet = await googleMeetService.getGoogleMeetById(id);

    if (googleMeet === null) {
      return res.status(400).json({
        success: false,
        message: message.GOOGLE_MEET_NOT_FOUND,
      });
    }

    if (!googleMeet) {
      return res.status(204).json({
        success: false,
        message: message.GOOGLE_MEET_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      googleMeet,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllGoogleMeets = async (
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

    const googleMeets = await googleMeetService.getAllGoogleMeets();

    if (googleMeets.length === 0) {
      return res.status(400).json({
        success: false,
        message: message.GOOGLE_MEET_NOT_FOUND,
      });
    }

    if (!googleMeets) {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_GOOGLE_MEETS,
      });
    }

    return res.status(200).json({
      success: true,
      googleMeets,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateGoogleMeetStatus = async (
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
    const googleMeet = await googleMeetService.getGoogleMeetById(id);

    if (!googleMeet) {
      return res.status(400).json({
        success: false,
        message: message.GOOGLE_MEET_NOT_FOUND,
      });
    }
    const updatedGoogleMeet = await googleMeetService.updateGoogleMeetStatus(
      id,
      userStatusUpdateData,
    );

    if (!updatedGoogleMeet) {
      return res.status(204).json({
        success: false,
        message: message.GOOGLE_MEET_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.GOOGLE_MEET_STATUS_UPDATED,
      googleMeet: updatedGoogleMeet,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
