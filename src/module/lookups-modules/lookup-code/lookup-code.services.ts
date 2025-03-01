import mongoose from 'mongoose';
import * as lookupCodeRepository from './lookup-code.repository';
import { LookupCodeDocument } from '@models/lookups-models/lookup-code.model';
import Log from '@models/lookups-models/log.model';
import logger from '../../../utils/logger';

export interface CreateLookupCodeInput {
  type: string;
  name: string;
  code: string;
  firstNumber: number;
  lastNumber: number;
  createdBy: mongoose.Types.ObjectId;
}

export const createLookupCode = async (
  lookupCodeData: CreateLookupCodeInput,
): Promise<LookupCodeDocument> => {
  logger.info('Creating lookup code', { lookupCodeData });
  return await lookupCodeRepository.createLookupCode(lookupCodeData);
};

export const getAllLookupCodes = async (): Promise<LookupCodeDocument[]> => {
  try {
    logger.info('Fetching all lookup codes');
    return await lookupCodeRepository.getAllLookupCodes();
  } catch (error: any) {
    throw new Error(`Error fetching lookup codes: ${error.message}`);
  }
};

export const getLookupCodeById = async (
  lookupCodeId: string,
): Promise<LookupCodeDocument | null> => {
  try {
    logger.info(`Fetching lookup code with ID ${lookupCodeId}`);
    return await lookupCodeRepository.findLookupCodeById(lookupCodeId);
  } catch (error: any) {
    throw new Error(`Error fetching lookup code: ${error.message}`);
  }
};

export const editLookupCode = async (
  lookupCodeId: string,
  lookupCodeData: Partial<LookupCodeDocument>,
): Promise<LookupCodeDocument | null> => {
  try {
    logger.info(`Editing lookup code with ID ${lookupCodeId}`, {
      lookupCodeData,
    });
    const updatedLookupCode = await lookupCodeRepository.updateLookupCode(
      lookupCodeId,
      lookupCodeData,
    );

    if (!updatedLookupCode) {
      throw new Error(`LookupCode with ID ${lookupCodeId} not found`);
    }

    await Log.create({
      userId: updatedLookupCode.userUpdatedBy,
      module: 'lookup_code',
      action: 'edit',
      actionId: updatedLookupCode._id,
      description: `Updated lookup code with ID ${lookupCodeId}`,
    });

    return updatedLookupCode;
  } catch (error: any) {
    throw new Error(`Error updating lookup code: ${error.message}`);
  }
};

export const getLookupCodeByType = async (
  lookupType: string,
): Promise<LookupCodeDocument | null> => {
  return await lookupCodeRepository.findLookupCodeByType(lookupType);
};

export const updateLookupCodeStatus = async (
  id: string,
  updatedData: Partial<LookupCodeDocument>,
  userId: mongoose.Types.ObjectId,
): Promise<LookupCodeDocument | null> => {
  try {
    logger.info(
      `Updating status for lookup code with ID ${id} to ${updatedData.status}`,
    );
    const updatedStatus = await lookupCodeRepository.changeLookupCodeStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`LookupCode with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedStatus.userUpdatedBy,
      module: 'lookup_code',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated the status for lookup code with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(`Error updating lookup code status: ${error.message}`);
  }
};

export const deleteLookupCode = async (
  lookupCodeId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<LookupCodeDocument | null> => {
  try {
    logger.info(
      `Deleting lookup code with ID ${lookupCodeId} by user ${deletedBy}`,
    );
    const deletedLookupCode = await lookupCodeRepository.deleteLookupCode(
      lookupCodeId,
      deletedBy,
    );

    if (!deletedLookupCode) {
      throw new Error(`LookupCode with ID ${lookupCodeId} not found`);
    }

    await Log.create({
      userId: deletedBy,
      module: 'lookup_code',
      action: 'delete',
      actionId: deletedLookupCode._id,
      description: `Deleted lookup code with ID ${lookupCodeId}`,
    });

    return deletedLookupCode;
  } catch (error: any) {
    throw new Error(`Error deleting lookup code: ${error.message}`);
  }
};
