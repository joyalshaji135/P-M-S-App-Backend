import { NextFunction, Response } from 'express';
import * as clientFeedbackService from './clients-feedbacks.services'; 
import { message } from '@constants/responseMessage'; 
import { RequestWithAuthData } from '../../../@types/express'; 
import { LookupTypes } from '@constants/lookup'; 
import { generateNewLookupCode } from '@utils/lookupCodeGenerator'; 
// import { clientFeedbackValidation } from '@validation/client-feedbacks/client-feedbacks.validation'; 
import { respondError } from '@helper/response'; 
import { getMessageFromValidationError } from '@helper/utils'; 

// Create a new client feedback profile
export const createClientFeedbackProfile = async (
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

    const { code, comment, rating, customer, industryProject } = req.body;

    // Generate a new lookup code if needed
    const lookupType = LookupTypes.CLIENT_FEEDBACK; 
    const generatedCode = await generateNewLookupCode(lookupType);

    const feedbackData = {
      code: generatedCode,
      comment,
      rating,
      customer,
      industryProject,
      createdBy: req.userId,
      submittedAt: new Date(),
    };

    // Uncomment if validation is needed
    // const { error } = clientFeedbackValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdFeedback =
      await clientFeedbackService.createClientFeedbackProfile(feedbackData);

    return res.status(201).json({
      success: true,
      message: message.CLIENT_FEEDBACK_CREATED_SUCCESS, // Update the success message
      feedback: createdFeedback,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit an existing client feedback profile
export const editClientFeedbackProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const feedbackData = {
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

    // Get Client Feedback By Id from the database
    const feedback = await clientFeedbackService.getClientFeedbackById(id);

    if (!feedback) {
      return res.status(400).json({
        success: false,
        message: message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
      });
    }

    const existingFeedback =
      await clientFeedbackService.getClientFeedbackById(id);
    if (!existingFeedback) {
      return res.status(204).json({
        success: false,
        message: message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
      });
    }

    const updatedFeedback =
      await clientFeedbackService.editClientFeedbackProfile(id, feedbackData);

    if (!updatedFeedback) {
      return res.status(204).json({
        success: false,
        message: message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
      });
    }

    return res.status(200).json({
      success: true,
      message: message.CLIENT_FEEDBACK_UPDATED_SUCCESS, // Update the success message
      feedback: updatedFeedback,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a client feedback profile
export const deleteClientFeedbackProfile = async (
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

    const deletedFeedback =
      await clientFeedbackService.deleteClientFeedbackProfile(id, req.userId);

    if (!deletedFeedback) {
      return res.status(204).json({
        success: false,
        message: message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
      });
    }

    return res.status(200).json({
      success: true,
      message: message.CLIENT_FEEDBACK_DELETED, // Update the success message
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all client feedback profiles
export const getAllClientFeedbacks = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    const feedbacks = await clientFeedbackService.getAllClientFeedbacks();

    return res.status(200).json({
      success: true,
      message: message.CLIENT_FEEDBACKS_FETCHED_SUCCESS, // Update the success message
      feedbacks,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a client feedback profile by ID
export const getClientFeedbackById = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    const feedback = await clientFeedbackService.getClientFeedbackById(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
      });
    }

    return res.status(200).json({
      success: true,
      message: message.CLIENT_FEEDBACK_FETCHED_SUCCESS, // Update the success message
      feedback,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update the status of a client feedback profile
export const updateClientFeedbackStatus = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const { feedbackStatus, userUpdatedBy } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const updatedFeedback =
      await clientFeedbackService.updateClientFeedbackStatus(id, {
        feedbackStatus,
        userUpdatedBy: req.userId,
        userUpdatedDate: new Date(),
      });

    if (!updatedFeedback) {
      return res.status(404).json({
        success: false,
        message: message.CLIENT_FEEDBACK_NOT_FOUND, // Update the error message
      });
    }

    return res.status(200).json({
      success: true,
      message: message.CLIENT_FEEDBACK_STATUS_UPDATED, // Update the success message
      feedback: updatedFeedback,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
