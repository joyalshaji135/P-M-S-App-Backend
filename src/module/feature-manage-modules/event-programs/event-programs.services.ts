import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as eventProgramsRepository from './event-programs.repositorys';
import { eventProgramsDocument } from '@models/feature-manage-modules-models/event-programs.models';

export const createEventProgram = async (
  eventProgramData: Partial<eventProgramsDocument>,
): Promise<eventProgramsDocument> => {
  try {
    logger.info('Creating a new event program', { eventProgramData });
    if (!eventProgramData.name) {
      throw new Error('Event program name is required.');
    }

    if (!eventProgramData.nameAlias) {
      throw new Error('Event program name alias is required.');
    }

    const existingEventProgramByName =
      await eventProgramsRepository.isNameExists(eventProgramData.name);
    const existingEventProgramByAlias =
      await eventProgramsRepository.isNameAliasExists(
        eventProgramData.nameAlias,
      );

    if (existingEventProgramByName) {
      throw new Error('An event program with the same name already exists.');
    }

    if (existingEventProgramByAlias) {
      throw new Error(
        'An event program with the same name alias already exists.',
      );
    }

    const newEventProgram =
      await eventProgramsRepository.create(eventProgramData);
    await Log.create({
      userId: newEventProgram.createdBy,
      module: 'eventProgram',
      action: 'create',
      actionId: newEventProgram._id,
      description: `Created a new event program with name: ${newEventProgram.name}`,
    });

    return newEventProgram;
  } catch (error: any) {
    throw new Error(`Error creating event program: ${error.message}`);
  }
};

export const editEventProgram = async (
  eventProgramId: string,
  eventProgramData: Partial<eventProgramsDocument>,
): Promise<eventProgramsDocument | null> => {
  try {
    logger.info(`Editing event program with ID ${eventProgramId}`, {
      eventProgramData,
    });
    if (eventProgramData.name) {
      const existingEventProgram = await eventProgramsRepository.isNameExists(
        eventProgramData.name,
        eventProgramId,
      );
      if (existingEventProgram) {
        throw new Error('An event program with the same name already exists.');
      }
    }

    if (eventProgramData.nameAlias) {
      const existingEventProgram =
        await eventProgramsRepository.isNameAliasExists(
          eventProgramData.nameAlias,
          eventProgramId,
        );
      if (existingEventProgram) {
        throw new Error(
          'An event program with the same name alias already exists.',
        );
      }
    }

    const updatedEventProgram = await eventProgramsRepository.updateById(
      eventProgramId,
      eventProgramData,
    );

    if (!updatedEventProgram) {
      throw new Error(
        `Event program with ID ${eventProgramId} not found`,
      );
    }

    await Log.create({
      userId: updatedEventProgram.userUpdatedBy,
      module: 'eventProgram',
      action: 'edit',
      actionId: updatedEventProgram._id,
      description: `Updated event program with ID ${eventProgramId}`,
    });

    return updatedEventProgram;
  } catch (error: any) {
    throw new Error(`Error updating event program: ${error.message}`);
  }
};

export const getAllEventPrograms = async () => {
  logger.info('Getting all event programs');
  return eventProgramsRepository.getAllEventPrograms();
};

export const getEventProgramById = async (id: string) => {
  logger.info(`Getting event program with ID ${id}`);
  return eventProgramsRepository.findById(id);
};

export const deleteEventProgram = async (
  eventProgramId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(
      `Deleting event program with ID ${eventProgramId} by user ${deletedBy}`,
    );

    const deletedEventProgram = await eventProgramsRepository.deleteEventProgram(
      eventProgramId,
      deletedBy,
    );

    if (!deletedEventProgram) {
      throw new Error(
        `Event program with ID ${eventProgramId} not found`,
      );
    }
    return deletedEventProgram;
  } catch (error: any) {
    throw new Error(`Error deleting event program: ${error.message}`);
  }
};

export const updateEventProgramStatus = async (
  id: string,
  updatedData: Partial<eventProgramsDocument>,
): Promise<eventProgramsDocument | null> => {
  try {
    logger.info(
      `Updating status for event program with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await eventProgramsRepository.changeEventProgramStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Event program with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'eventProgram',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for event program with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(
      `Error updating event program status: ${error.message}`,
    );
  }
};