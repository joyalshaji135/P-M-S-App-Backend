import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as priorityRepository from './priority.repository';
import { priorityDocument } from '@models/lookups-models/priority.model';

export const createPriorityProfile = async (
  priorityData: Partial<priorityDocument>,
): Promise<priorityDocument> => {
  try {
    logger.info('Creating a new priority profile', { priorityData });

    if (!priorityData.name) {
      throw new Error('Priority name is required.');
    }

    if (!priorityData.nameAlias) {
      throw new Error('Priority name alias is required.');
    }

    const existingPriorityByName = await priorityRepository.isNameExists(
      priorityData.name,
    );
    const existingPriorityByAlias = await priorityRepository.isNameAliasExists(
      priorityData.nameAlias,
    );

    if (existingPriorityByName) {
      throw new Error('A priority with the same name already exists.');
    }

    if (existingPriorityByAlias) {
      throw new Error('A priority with the same name alias already exists.');
    }

    const newPriorityProfile = await priorityRepository.create(priorityData);
    await Log.create({
      userId: newPriorityProfile.createdBy,
      module: 'priority',
      action: 'create',
      actionId: newPriorityProfile._id,
      description: `Created a new priority profile with name: ${newPriorityProfile.name}`,
    });

    return newPriorityProfile;
  } catch (error: any) {
    throw new Error(`Error creating priority profile: ${error.message}`);
  }
};

export const editPriorityProfile = async (
  priorityId: string,
  priorityData: Partial<priorityDocument>,
): Promise<priorityDocument | null> => {
  try {
    logger.info(`Editing priority profile with ID ${priorityId}`, {
      priorityData,
    });

    if (priorityData.name) {
      const existingPriority = await priorityRepository.isNameExists(
        priorityData.name,
        priorityId,
      );
      if (existingPriority) {
        throw new Error('A priority with the same name already exists.');
      }
    }

    if (priorityData.nameAlias) {
      const existingPriority = await priorityRepository.isNameAliasExists(
        priorityData.nameAlias,
        priorityId,
      );
      if (existingPriority) {
        throw new Error('A priority with the same name alias already exists.');
      }
    }

    const updatedPriorityProfile = await priorityRepository.updateById(
      priorityId,
      priorityData,
    );

    if (!updatedPriorityProfile) {
      throw new Error(`Priority profile with ID ${priorityId} not found`);
    }

    await Log.create({
      userId: updatedPriorityProfile.userUpdatedBy,
      module: 'priority',
      action: 'edit',
      actionId: updatedPriorityProfile._id,
      description: `Updated priority profile with ID ${priorityId}`,
    });

    return updatedPriorityProfile;
  } catch (error: any) {
    throw new Error(`Error updating priority profile: ${error.message}`);
  }
};

export const getAllPriorities = async () => {
  logger.info('Getting all priorities');
  return priorityRepository.getAllPriorities();
};

export const getPriorityById = async (id: string) => {
  logger.info(`Getting priority with ID ${id}`);
  return priorityRepository.findById(id);
};

export const deletePriority = async (
  priorityId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(`Deleting priority with ID ${priorityId} by user ${deletedBy}`);

    const deletedPriority = await priorityRepository.deletePriority(
      priorityId,
      deletedBy,
    );

    if (!deletedPriority) {
      throw new Error(`Priority profile with ID ${priorityId} not found`);
    }

    return deletedPriority;
  } catch (error: any) {
    throw new Error(`Error deleting priority profile: ${error.message}`);
  }
};

export const updatePriorityStatus = async (
  id: string,
  updatedData: Partial<priorityDocument>,
): Promise<priorityDocument | null> => {
  try {
    logger.info(
      `Updating status for priority with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await priorityRepository.changePriorityStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Priority profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'priority',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for priority profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(`Error updating priority profile status: ${error.message}`);
  }
};
