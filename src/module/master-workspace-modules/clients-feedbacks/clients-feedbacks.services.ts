import mongoose from 'mongoose';
import logger from '@utils/logger'; // Adjust the import path as needed
import Log from '@models/lookups-models/log.model'; // Adjust the import path as needed
import * as clientFeedbackRepository from './clients-feedbacks.repositorys'; // Adjust the import path as needed
import { clientFeedbackDocument } from '@models/master-workspace-modules-models/clients-feedbacks.models';  // Adjust the import path as needed

// Create a new client feedback profile
export const createClientFeedbackProfile = async (
  feedbackData: Partial<clientFeedbackDocument>,
): Promise<clientFeedbackDocument> => {
  try {
    logger.info('Creating a new client feedback profile', { feedbackData });

    if (!feedbackData.code) {
      throw new Error('Client feedback code is required.');
    }

    if (!feedbackData.comment) {
      throw new Error('Client feedback comment is required.');
    }

    if (!feedbackData.rating) {
      throw new Error('Client feedback rating is required.');
    }

    const existingFeedbackByCode = await clientFeedbackRepository.isFeedbackCodeExists(
      feedbackData.code,
    );

    if (existingFeedbackByCode) {
      throw new Error('A client feedback with the same code already exists.');
    }

    const newFeedbackProfile = await clientFeedbackRepository.createClientFeedback(feedbackData);

    await Log.create({
      userId: newFeedbackProfile.createdBy,
      module: 'clientFeedback',
      action: 'create',
      actionId: newFeedbackProfile._id,
      description: `Created a new client feedback profile with code: ${newFeedbackProfile.code}`,
    });

    return newFeedbackProfile;
  } catch (error: any) {
    throw new Error(`Error creating client feedback profile: ${error.message}`);
  }
};

// Edit an existing client feedback profile
export const editClientFeedbackProfile = async (
  feedbackId: string,
  feedbackData: Partial<clientFeedbackDocument>,
): Promise<clientFeedbackDocument | null> => {
  try {
    logger.info(`Editing client feedback profile with ID ${feedbackId}`, {
      feedbackData,
    });

    if (feedbackData.code) {
      const existingFeedback = await clientFeedbackRepository.isFeedbackCodeExists(
        feedbackData.code,
        feedbackId,
      );
      if (existingFeedback) {
        throw new Error('A client feedback with the same code already exists.');
      }
    }

    const updatedFeedbackProfile = await clientFeedbackRepository.updateClientFeedbackById(
      feedbackId,
      feedbackData,
    );

    if (!updatedFeedbackProfile) {
      throw new Error(`Client feedback profile with ID ${feedbackId} not found`);
    }

    await Log.create({
      userId: updatedFeedbackProfile.userUpdatedBy,
      module: 'clientFeedback',
      action: 'edit',
      actionId: updatedFeedbackProfile._id,
      description: `Updated client feedback profile with ID ${feedbackId}`,
    });

    return updatedFeedbackProfile;
  } catch (error: any) {
    throw new Error(`Error updating client feedback profile: ${error.message}`);
  }
};

// Get all client feedback profiles
export const getAllClientFeedbacks = async () => {
  logger.info('Getting all client feedbacks');
  return clientFeedbackRepository.getAllClientFeedbacks();
};

// Get a client feedback profile by ID
export const getClientFeedbackById = async (id: string) => {
  logger.info(`Getting client feedback with ID ${id}`);
  return clientFeedbackRepository.findClientFeedbackById(id);
};

// Soft delete a client feedback profile
export const deleteClientFeedbackProfile = async (
  feedbackId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(
      `Deleting client feedback with ID ${feedbackId} by user ${deletedBy}`,
    );

    const deletedFeedback = await clientFeedbackRepository.deleteClientFeedback(
      feedbackId,
      deletedBy,
    );

    if (!deletedFeedback) {
      throw new Error(`Client feedback profile with ID ${feedbackId} not found`);
    }

    await Log.create({
      userId: deletedBy,
      module: 'clientFeedback',
      action: 'delete',
      actionId: deletedFeedback._id,
      description: `Deleted client feedback profile with ID ${feedbackId}`,
    });

    return deletedFeedback;
  } catch (error: any) {
    throw new Error(`Error deleting client feedback profile: ${error.message}`);
  }
};

// Update the status of a client feedback profile
export const updateClientFeedbackStatus = async (
  id: string,
  updatedData: Partial<clientFeedbackDocument>,
): Promise<clientFeedbackDocument | null> => {
  try {
    logger.info(
      `Updating status for client feedback with ID ${id} to ${updatedData.feedbackStatus} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await clientFeedbackRepository.changeClientFeedbackStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Client feedback profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'clientFeedback',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for client feedback profile with ID ${id} to ${updatedData.feedbackStatus}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(
      `Error updating client feedback profile status: ${error.message}`,
    );
  }
};