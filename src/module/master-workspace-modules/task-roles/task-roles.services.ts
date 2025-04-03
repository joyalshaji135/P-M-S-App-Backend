import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as taskRoleRepository from './task-roles.repository';
import { taskRoleDocument } from '@models/master-workspace-modules-models/task-role.models';

export const createTaskRole = async (
  taskRoleData: Partial<taskRoleDocument>,
): Promise<taskRoleDocument> => {
  try {
    logger.info('Creating a new task role profile', {
      taskRoleData,
    });
    if (!taskRoleData.taskName) {
      throw new Error('Task role name is required.');
    }

    if (!taskRoleData.nameAlias) {
      throw new Error('Task role name alias is required.');
    }

    const existingTaskRoleByName = await taskRoleRepository.isNameExists(
      taskRoleData.taskName,
    );
    const existingTaskRoleByAlias = await taskRoleRepository.isNameAliasExists(
      taskRoleData.nameAlias,
    );

    if (existingTaskRoleByName) {
      throw new Error('A task role with the same name already exists.');
    }

    if (existingTaskRoleByAlias) {
      throw new Error('A task role with the same name alias already exists.');
    }

    const newTaskRoleProfile = await taskRoleRepository.create(taskRoleData);
    await Log.create({
      userId: newTaskRoleProfile.createdBy,
      module: 'taskRole',
      action: 'create',
      actionId: newTaskRoleProfile._id,
      description: `Created a new task role profile with name: ${newTaskRoleProfile.taskName}`,
    });

    return newTaskRoleProfile;
  } catch (error: any) {
    throw new Error(`Error creating task role profile: ${error.message}`);
  }
};

export const editTaskRole = async (
  taskRoleId: string,
  taskRoleData: Partial<taskRoleDocument>,
): Promise<taskRoleDocument | null> => {
  try {
    logger.info(`Editing task role profile with ID ${taskRoleId}`, {
      taskRoleData,
    });
    if (taskRoleData.taskName) {
      const existingTaskRole = await taskRoleRepository.isNameExists(
        taskRoleData.taskName,
        taskRoleId,
      );
      if (existingTaskRole) {
        throw new Error('A task role with the same name already exists.');
      }
    }

    if (taskRoleData.nameAlias) {
      const existingTaskRole = await taskRoleRepository.isNameAliasExists(
        taskRoleData.nameAlias,
        taskRoleId,
      );
      if (existingTaskRole) {
        throw new Error('A task role with the same name alias already exists.');
      }
    }

    const updatedTaskRoleProfile = await taskRoleRepository.updateById(
      taskRoleId,
      taskRoleData,
    );

    if (!updatedTaskRoleProfile) {
      throw new Error(`Task role profile with ID ${taskRoleId} not found`);
    }

    await Log.create({
      userId: updatedTaskRoleProfile.userUpdatedBy,
      module: 'taskRole',
      action: 'edit',
      actionId: updatedTaskRoleProfile._id,
      description: `Updated task role profile with ID ${taskRoleId}`,
    });

    return updatedTaskRoleProfile;
  } catch (error: any) {
    throw new Error(`Error updating task role profile: ${error.message}`);
  }
};

export const getAllTaskRoles = async () => {
  logger.info('Getting all task roles');
  return taskRoleRepository.getAllTaskRoles();
};

export const getTaskRoleById = async (id: string) => {
  logger.info(`Getting task role with ID ${id}`);
  return taskRoleRepository.findById(id);
};

export const deleteTaskRole = async (
  taskRoleId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(
      `Deleting task role with ID ${taskRoleId} by user ${deletedBy}`,
    );

    const deletedTaskRole = await taskRoleRepository.deleteTaskRole(
      taskRoleId,
      deletedBy,
    );

    if (!deletedTaskRole) {
      throw new Error(`Task role profile with ID ${taskRoleId} not found`);
    }
    return deletedTaskRole;
  } catch (error: any) {
    throw new Error(`Error deleting task role profile: ${error.message}`);
  }
};

export const updateTaskRoleStatus = async (
  id: string,
  updatedData: Partial<taskRoleDocument>,
): Promise<taskRoleDocument | null> => {
  try {
    logger.info(
      `Updating status for task role with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await taskRoleRepository.changeTaskRoleStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Task role profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'taskRole',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for task role profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(
      `Error updating task role profile status: ${error.message}`,
    );
  }
};

// exports.updateTaskStatus = async (taskId, updateFields) => {
//   try {
//       // Filter out undefined fields
//       const fieldsToUpdate = {};
//       if (updateFields.percentageOfCompleted !== undefined) {
//           fieldsToUpdate.percentageOfCompleted = updateFields.percentageOfCompleted;
//       }
//       if (updateFields.taskStatus !== undefined) {
//           fieldsToUpdate.taskStatus = updateFields.taskStatus;
//       }

//       // Add updatedAt timestamp
//       fieldsToUpdate.updatedAt = new Date();

//       const updatedTask = await taskRepository.findByIdAndUpdate(
//           taskId, 
//           fieldsToUpdate,
//           { new: true }
//       );

//       if (!updatedTask) {
//           throw new Error('Task not found');
//       }

//       return updatedTask;
//   } catch (error) {
//       throw error;
//   }
// };