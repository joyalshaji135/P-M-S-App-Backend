import { NextFunction, Response } from 'express';
import * as eventProgramsService from './event-programs.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { eventProgramsValidation } from '@validation/event-programs/event-programs.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createEventProgramsProfile = async (
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
    const lookupType = LookupTypes.EVENT_PROGRAMS;
    const code = await generateNewLookupCode(lookupType);

    const eventProgramsData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };
    // Add Validation for EventPrograms
    // const { error } = eventProgramsValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdEventPrograms =
      await eventProgramsService.createEventProgram(eventProgramsData);

    return res.status(201).json({
      success: true,
      message: message.EVENT_PROGRAMS_CREATED_SUCCESS,
      eventPrograms: createdEventPrograms,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editEventProgramsProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const eventProgramsData = {
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
    // Get EventPrograms By Id from the database
    const eventPrograms = await eventProgramsService.getEventProgramById(id);

    if (!eventPrograms) {
      return res.status(400).json({
        success: false,
        message: message.EVENT_PROGRAMS_NOT_FOUND,
      });
    }
    if (req.body.name) {
      const name = req.body.name;
      const nameAlias = name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, '');
      eventProgramsData.nameAlias = nameAlias;
    }

    const existingEventPrograms =
      await eventProgramsService.getEventProgramById(id);
    if (!existingEventPrograms) {
      return res.status(204).json({
        success: false,
        message: message.EVENT_PROGRAMS_NOT_FOUND,
      });
    }

    const updatedEventPrograms = await eventProgramsService.editEventProgram(
      id,
      eventProgramsData,
    );

    if (!updatedEventPrograms) {
      return res.status(204).json({
        success: false,
        message: message.EVENT_PROGRAMS_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.EVENT_PROGRAMS_UPDATED_SUCCESS,
      eventPrograms: updatedEventPrograms,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEventProgramsProfile = async (
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

    const deletedEventPrograms = await eventProgramsService.deleteEventProgram(
      id,
      req.userId,
    );

    if (!deletedEventPrograms) {
      return res.status(204).json({
        success: false,
        message: message.EVENT_PROGRAMS_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.EVENT_PROGRAMS_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getEventProgramsById = async (
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

    const eventPrograms = await eventProgramsService.getEventProgramById(id);

    if (eventPrograms === null) {
      return res.status(400).json({
        success: false,
        message: message.EVENT_PROGRAMS_NOT_FOUND,
      });
    }

    if (!eventPrograms) {
      return res.status(204).json({
        success: false,
        message: message.EVENT_PROGRAMS_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      eventPrograms,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEventPrograms = async (
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

    const eventPrograms = await eventProgramsService.getAllEventPrograms();

    if (eventPrograms.length === 0) {
      return res.status(400).json({
        success: false,
        message: message.EVENT_PROGRAMS_NOT_FOUND,
      });
    }

    if (!eventPrograms) {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_EVENT_PROGRAMS,
      });
    }

    return res.status(200).json({
      success: true,
      eventPrograms,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEventProgramsStatus = async (
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
    const eventPrograms = await eventProgramsService.getEventProgramById(id);

    if (!eventPrograms) {
      return res.status(400).json({
        success: false,
        message: message.EVENT_PROGRAMS_NOT_FOUND,
      });
    }
    const updatedEventPrograms =
      await eventProgramsService.updateEventProgramStatus(
        id,
        userStatusUpdateData,
      );

    if (!updatedEventPrograms) {
      return res.status(204).json({
        success: false,
        message: message.EVENT_PROGRAMS_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.EVENT_PROGRAMS_STATUS_UPDATED,
      eventPrograms: updatedEventPrograms,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
