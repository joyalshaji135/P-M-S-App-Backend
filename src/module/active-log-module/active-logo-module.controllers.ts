import { Request, Response } from 'express';
import * as activeLogService from './active-logo-module.services';
import { RequestWithAuthData } from '@src/@types/express';
import { message } from '@constants/responseMessage';
import logger from '@utils/logger';

// Get all active logs
export const getAllActiveLogs = async (
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
      const activeLog =
        await activeLogService.getAllActiveLogs();
      return res.status(200).json({
        success: true,
        message: message.GET_ALL_ACTIVE_LOGS_SUCCESS,
        activeLog,
      });
    } catch (error: any) {
      logger.error('Error in Get All Active Logs', error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };