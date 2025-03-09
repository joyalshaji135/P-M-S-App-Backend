import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as alertModeRepository from './alert-modes.repositorys';
import { alertModeDocument } from '@models/master-workspace-modules-models/alert-mode.models'; 
export const createAlertModeProfile = async (
  alertModeData: Partial<alertModeDocument>,
): Promise<alertModeDocument> => {
  try {
    logger.info('Creating a new alert mode profile', { alertModeData });

    if (!alertModeData.code) {
      throw new Error('Alert mode code is required.');
    }

    if (!alertModeData.message) {
      throw new Error('Alert mode message is required.');
    }

    const existingAlertModeByCode = await alertModeRepository.isCodeExists(
      alertModeData.code,
    );


    if (existingAlertModeByCode) {
      throw new Error('An alert mode with the same code already exists.');
    }

    const newAlertModeProfile = await alertModeRepository.createAlertMode(alertModeData);

    await Log.create({
      userId: newAlertModeProfile.createdBy,
      module: 'alertMode',
      action: 'create',
      actionId: newAlertModeProfile._id,
      description: `Created a new alert mode profile with code: ${newAlertModeProfile.code}`,
    });

    return newAlertModeProfile;
  } catch (error: any) {
    throw new Error(`Error creating alert mode profile: ${error.message}`);
  }
};

export const editAlertModeProfile = async (
  alertModeId: string,
  alertModeData: Partial<alertModeDocument>,
): Promise<alertModeDocument | null> => {
  try {
    logger.info(`Editing alert mode profile with ID ${alertModeId}`, {
      alertModeData,
    });

    if (alertModeData.code) {
      const existingAlertMode = await alertModeRepository.isCodeExists(
        alertModeData.code,
        alertModeId,
      );
      if (existingAlertMode) {
        throw new Error('An alert mode with the same code already exists.');
      }
    }

    const updatedAlertModeProfile = await alertModeRepository.updateAlertModeById(
      alertModeId,
      alertModeData,
    );

    if (!updatedAlertModeProfile) {
      throw new Error(`Alert mode profile with ID ${alertModeId} not found`);
    }

    await Log.create({
      userId: updatedAlertModeProfile.userUpdatedBy,
      module: 'alertMode',
      action: 'edit',
      actionId: updatedAlertModeProfile._id,
      description: `Updated alert mode profile with ID ${alertModeId}`,
    });

    return updatedAlertModeProfile;
  } catch (error: any) {
    throw new Error(`Error updating alert mode profile: ${error.message}`);
  }
};

export const getAllAlertModes = async () => {
  logger.info('Getting all alert modes');
  return alertModeRepository.getAllAlertModes();
};

export const getAlertModeById = async (id: string) => {
  logger.info(`Getting alert mode with ID ${id}`);
  return alertModeRepository.findAlertModeById(id);
};

export const deleteAlertMode = async (
  alertModeId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(
      `Deleting alert mode with ID ${alertModeId} by user ${deletedBy}`,
    );

    const deletedAlertMode = await alertModeRepository.deleteAlertMode(
      alertModeId,
      deletedBy,
    );

    if (!deletedAlertMode) {
      throw new Error(`Alert mode profile with ID ${alertModeId} not found`);
    }

    await Log.create({
      userId: deletedBy,
      module: 'alertMode',
      action: 'delete',
      actionId: deletedAlertMode._id,
      description: `Deleted alert mode profile with ID ${alertModeId}`,
    });

    return deletedAlertMode;
  } catch (error: any) {
    throw new Error(`Error deleting alert mode profile: ${error.message}`);
  }
};

export const updateAlertModeStatus = async (
  id: string,
  updatedData: Partial<alertModeDocument>,
): Promise<alertModeDocument | null> => {
  try {
    logger.info(
      `Updating status for alert mode with ID ${id} to ${updatedData.alertStatus} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await alertModeRepository.changeAlertModeStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Alert mode profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'alertMode',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for alert mode profile with ID ${id} to ${updatedData.alertStatus}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(
      `Error updating alert mode profile status: ${error.message}`,
    );
  }
};