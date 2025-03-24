import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as taskModuleRepository from './task-module.repository';
import { taskModuleDocument } from '@models/lookups-models/task-module.model';

export const createTaskModuleProfile = async (
  taskModuleData: Partial<taskModuleDocument>,
): Promise<taskModuleDocument> => {
  try {
    logger.info('Creating a new task module profile', { taskModuleData });
    if (!taskModuleData.name) {
      throw new Error('Task module name is required.');
    }

    if (!taskModuleData.nameAlias) {
      throw new Error('Task module name alias is required.');
    }

    const existingTaskModuleByName = await taskModuleRepository.isNameExists(taskModuleData.name);
    const existingTaskModuleByAlias = await taskModuleRepository.isNameAliasExists(taskModuleData.nameAlias);

    if (existingTaskModuleByName) {
      throw new Error('A task module with the same name already exists.');
    }

    if (existingTaskModuleByAlias) {
      throw new Error('A task module with the same name alias already exists.');
    }

    const newTaskModuleProfile = await taskModuleRepository.create(taskModuleData);
    await Log.create({
      userId: newTaskModuleProfile.createdBy,
      module: 'taskModule',
      action: 'create',
      actionId: newTaskModuleProfile._id,
      description: `Created a new task module profile with name: ${newTaskModuleProfile.name}`,
    });

    return newTaskModuleProfile;
  } catch (error: any) {
    throw new Error(`Error creating task module profile: ${error.message}`);
  }
};

export const editTaskModuleProfile = async (
  taskModuleId: string,
  taskModuleData: Partial<taskModuleDocument>,
): Promise<taskModuleDocument | null> => {
  try {
    logger.info(`Editing task module profile with ID ${taskModuleId}`, {
      taskModuleData,
    });
    if (taskModuleData.name) {
      const existingTaskModule = await taskModuleRepository.isNameExists(taskModuleData.name, taskModuleId);
      if (existingTaskModule) {
        throw new Error('A task module with the same name already exists.');
      }
    }

    if (taskModuleData.nameAlias) {
      const existingTaskModule = await taskModuleRepository.isNameAliasExists(taskModuleData.nameAlias, taskModuleId);
      if (existingTaskModule) {
        throw new Error('A task module with the same name alias already exists.');
      }
    }

    const updatedTaskModuleProfile = await taskModuleRepository.updateById(taskModuleId, taskModuleData);

    if (!updatedTaskModuleProfile) {
      throw new Error(`Task module profile with ID ${taskModuleId} not found`);
    }

    await Log.create({
      userId: updatedTaskModuleProfile.userUpdatedBy,
      module: 'taskModule',
      action: 'edit',
      actionId: updatedTaskModuleProfile._id,
      description: `Updated task module profile with ID ${taskModuleId}`,
    });

    return updatedTaskModuleProfile;
  } catch (error: any) {
    throw new Error(`Error updating task module profile: ${error.message}`);
  }
};

export const getAllTaskModules = async () => {
  logger.info('Getting all task modules');
  return taskModuleRepository.getAllTaskModules();
};

export const getTaskModuleById = async (id: string) => {
  logger.info(`Getting task module with ID ${id}`);
  return taskModuleRepository.findById(id);
};

export const deleteTaskModule = async (
  taskModuleId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(`Deleting task module with ID ${taskModuleId} by user ${deletedBy}`);

    const deletedTaskModule = await taskModuleRepository.deleteTaskModule(taskModuleId, deletedBy);

    if (!deletedTaskModule) {
      throw new Error(`Task module profile with ID ${taskModuleId} not found`);
    }
    return deletedTaskModule;
  } catch (error: any) {
    throw new Error(`Error deleting task module profile: ${error.message}`);
  }
};

export const updateTaskModuleStatus = async (
  id: string,
  updatedData: Partial<taskModuleDocument>,
): Promise<taskModuleDocument | null> => {
  try {
    logger.info(
      `Updating status for task module with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await taskModuleRepository.changeTaskModuleStatus(id, updatedData);

    if (!updatedStatus) {
      throw new Error(`Task module profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'taskModule',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for task module profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(`Error updating task module profile status: ${error.message}`);
  }
};