import logger from '@src/utils/logger';
import { UserLogDocument } from '@models/lookups-models/log.model';
import * as activeLogRepository from './active-logo-module.repository';

export const getAllActiveLogs = async (): Promise<UserLogDocument[]> => {
  try {
    return await activeLogRepository.getAllUserLog();
  } catch (error: any) {
    logger.error('Error in Get All Active Logs', error.message);
    throw error;
  }
};
