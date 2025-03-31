import { Request, Response } from 'express';
import * as commonCountApiServices from './common-count-api.services';
import { RequestWithAuthData } from '@src/@types/express';
import { message } from '@constants/responseMessage';
import logger from '@utils/logger';

// Company Owner Count Functionality
export const getAllCompanyOwnerCount = async (
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
    const companyOwnerCount =
      await commonCountApiServices.getAllCompanyOwnerCount();
    return res.status(200).json({
      success: true,
      message: message.GET_COMPANY_OWNER_COUNT_SUCCESS,
      companyOwnerCount,
    });
  } catch (error: any) {
    logger.error('Error in Company Owner Count', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Team Manager Count Functions
export const getAllTeamManagerCount = async (
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
    const teamManagerCount =
      await commonCountApiServices.getAllTeamManagerCount();
    return res.status(200).json({
      success: true,
      message: message.GET_TEAM_MANAGER_COUNT_SUCCESS,
      teamManagerCount,
    });
  } catch (error: any) {
    logger.error('Error in Team Manager Count', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Team Member Count Functions
export const getAllTeamMemberCount = async (
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
    const teamMemberCount =
      await commonCountApiServices.getAllTeamMemberCount();
    return res.status(200).json({
      success: true,
      message: message.GET_TEAM_MEMBERS_COUNT_SUCCESS,
      teamMemberCount,
    });
  } catch (error: any) {
    logger.error('Error in Team Member Count', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Event Count Functions
export const getAllEventCount = async (
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
    const eventCount = await commonCountApiServices.getAllEventCount();
    return res.status(200).json({
      success: true,
      message: message.GET_EVENT_PROGRAMS_COUNT_SUCCESS,
      eventCount,
    });
  } catch (error: any) {
    logger.error('Error in Event Count', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Google Meet Count Functions
export const getAllGoogleMeetCount = async (
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
    const googleMeetCount =
      await commonCountApiServices.getAllGoogleMeetCount();
    return res.status(200).json({
      success: true,
      message: message.GET_GOOGLE_MEET_COUNT_SUCCESS,
      googleMeetCount,
    });
  } catch (error: any) {
    logger.error('Error in Google Meet Count', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Recruitment Count Functions
export const getAllRecruitmentCount = async (
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
    const recruitmentCount =
      await commonCountApiServices.getAllRecruitmentCount();
    return res.status(200).json({
      success: true,
      message: message.GET_RECRUITMENT_POST_COUNT_SUCCESS,
      recruitmentCount,
    });
  } catch (error: any) {
    logger.error('Error in Recruitment Count', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// File Document Count Functions
export const getAllDocumentFileCount = async (
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
    const documentFileCount =
      await commonCountApiServices.getAllDocumentFileCount();
    return res.status(200).json({
      success: true,
      message: message.GET_DOCUMENT_FILE_COUNT_SUCCESS,
      documentFileCount,
    });
  } catch (error: any) {
    logger.error('Error in Document File Count', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
