import mongoose from 'mongoose';
import Log, { UserLogDocument } from '@models/lookups-models/log.model';

// getAllUserLog
export const getAllUserLog = async () => {
  return await Log.find()
    .populate('userId', 'name email phone role')
    .populate('actionId', 'name email phone role');
};
