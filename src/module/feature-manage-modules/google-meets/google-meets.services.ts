import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as googleMeetRepository from './google-meets.repositorys';
import { googleMeetDocument } from '@models/feature-manage-modules-models/google-meets.models';

export const createGoogleMeetProfile = async (
  googleMeetData: Partial<googleMeetDocument>,
): Promise<googleMeetDocument> => {
  try {
    logger.info('Creating a new google meet profile', { googleMeetData });
    if (!googleMeetData.name) {
      throw new Error('Google meet name is required.');
    }

    if (!googleMeetData.nameAlias) {
      throw new Error('Google meet name alias is required.');
    }

    const existingGoogleMeetByName = await googleMeetRepository.isNameExists(
      googleMeetData.name,
    );
    const existingGoogleMeetByAlias =
      await googleMeetRepository.isNameAliasExists(googleMeetData.nameAlias);

    if (existingGoogleMeetByName) {
      throw new Error('A google meet with the same name already exists.');
    }

    if (existingGoogleMeetByAlias) {
      throw new Error('A google meet with the same name alias already exists.');
    }

    const newGoogleMeetProfile =
      await googleMeetRepository.create(googleMeetData);
    await Log.create({
      userId: newGoogleMeetProfile.createdBy,
      module: 'googleMeet',
      action: 'create',
      actionId: newGoogleMeetProfile._id,
      description: `Created a new google meet profile with name: ${newGoogleMeetProfile.name}`,
    });

    return newGoogleMeetProfile;
  } catch (error: any) {
    throw new Error(`Error creating google meet profile: ${error.message}`);
  }
};

export const editGoogleMeetProfile = async (
  googleMeetId: string,
  googleMeetData: Partial<googleMeetDocument>,
): Promise<googleMeetDocument | null> => {
  try {
    logger.info(`Editing google meet profile with ID ${googleMeetId}`, {
      googleMeetData,
    });
    if (googleMeetData.name) {
      const existingGoogleMeet = await googleMeetRepository.isNameExists(
        googleMeetData.name,
        googleMeetId,
      );
      if (existingGoogleMeet) {
        throw new Error('A google meet with the same name already exists.');
      }
    }

    if (googleMeetData.nameAlias) {
      const existingGoogleMeet = await googleMeetRepository.isNameAliasExists(
        googleMeetData.nameAlias,
        googleMeetId,
      );
      if (existingGoogleMeet) {
        throw new Error(
          'A google meet with the same name alias already exists.',
        );
      }
    }

    const updatedGoogleMeetProfile = await googleMeetRepository.updateById(
      googleMeetId,
      googleMeetData,
    );

    if (!updatedGoogleMeetProfile) {
      throw new Error(`Google meet profile with ID ${googleMeetId} not found`);
    }

    await Log.create({
      userId: updatedGoogleMeetProfile.userUpdatedBy,
      module: 'googleMeet',
      action: 'edit',
      actionId: updatedGoogleMeetProfile._id,
      description: `Updated google meet profile with ID ${googleMeetId}`,
    });

    return updatedGoogleMeetProfile;
  } catch (error: any) {
    throw new Error(`Error updating google meet profile: ${error.message}`);
  }
};

export const getAllGoogleMeets = async () => {
  logger.info('Getting all google meets');
  return googleMeetRepository.getAllGoogleMeets();
};

export const getGoogleMeetById = async (id: string) => {
  logger.info(`Getting google meet with ID ${id}`);
  return googleMeetRepository.findById(id);
};

export const deleteGoogleMeet = async (
  googleMeetId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(
      `Deleting google meet with ID ${googleMeetId} by user ${deletedBy}`,
    );

    const deletedGoogleMeet = await googleMeetRepository.deleteGoogleMeet(
      googleMeetId,
      deletedBy,
    );

    if (!deletedGoogleMeet) {
      throw new Error(`Google meet profile with ID ${googleMeetId} not found`);
    }
    return deletedGoogleMeet;
  } catch (error: any) {
    throw new Error(`Error deleting google meet profile: ${error.message}`);
  }
};

export const updateGoogleMeetStatus = async (
  id: string,
  updatedData: Partial<googleMeetDocument>,
): Promise<googleMeetDocument | null> => {
  try {
    logger.info(
      `Updating status for google meet with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await googleMeetRepository.changeGoogleMeetStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Google meet profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'googleMeet',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for google meet profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(
      `Error updating google meet profile status: ${error.message}`,
    );
  }
};
