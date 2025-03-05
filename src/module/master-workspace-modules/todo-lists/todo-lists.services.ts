import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as todoListRepository from './todo-lists.repositorys';
import { todoListsDocument } from '@models/master-workspace-modules-models/todo-lists.models';

export const createTodoListProfile = async (
  todoListData: Partial<todoListsDocument>,
): Promise<todoListsDocument> => {
  try {
    logger.info('Creating a new todo list profile', { todoListData });
    if (!todoListData.titleName) {
      throw new Error('Todo list name is required.');
    }

    if (!todoListData.nameAlias) {
      throw new Error('Todo list name alias is required.');
    }

    const existingTodoListByName =
      await todoListRepository.isNameExists(todoListData.titleName);
    const existingTodoListByAlias =
      await todoListRepository.isNameAliasExists(
        todoListData.nameAlias,
      );

    if (existingTodoListByName) {
      throw new Error('A todo list with the same name already exists.');
    }

    if (existingTodoListByAlias) {
      throw new Error(
        'A todo list with the same name alias already exists.',
      );
    }

    const newTodoListProfile =
      await todoListRepository.create(todoListData);
    await Log.create({
      userId: newTodoListProfile.createdBy,
      module: 'todoList',
      action: 'create',
      actionId: newTodoListProfile._id,
      description: `Created a new todo list profile with name: ${newTodoListProfile.titleName}`,
    });

    return newTodoListProfile;
  } catch (error: any) {
    throw new Error(`Error creating todo list profile: ${error.message}`);
  }
};

export const editTodoListProfile = async (
  todoListId: string,
  todoListData: Partial<todoListsDocument>,
): Promise<todoListsDocument | null> => {
  try {
    logger.info(`Editing todo list profile with ID ${todoListId}`, {
      todoListData,
    });
    if (todoListData.titleName) {
      const existingTodoList = await todoListRepository.isNameExists(
        todoListData.titleName,
        todoListId,
      );
      if (existingTodoList) {
        throw new Error('A todo list with the same name already exists.');
      }
    }

    if (todoListData.nameAlias) {
      const existingTodoList =
        await todoListRepository.isNameAliasExists(
          todoListData.nameAlias,
          todoListId,
        );
      if (existingTodoList) {
        throw new Error(
          'A todo list with the same name alias already exists.',
        );
      }
    }

    const updatedTodoListProfile = await todoListRepository.updateById(
      todoListId,
      todoListData,
    );

    if (!updatedTodoListProfile) {
      throw new Error(
        `Todo list profile with ID ${todoListId} not found`,
      );
    }

    await Log.create({
      userId: updatedTodoListProfile.userUpdatedBy,
      module: 'todoList',
      action: 'edit',
      actionId: updatedTodoListProfile._id,
      description: `Updated todo list profile with ID ${todoListId}`,
    });

    return updatedTodoListProfile;
  } catch (error: any) {
    throw new Error(`Error updating todo list profile: ${error.message}`);
  }
};

export const getAllTodoLists = async () => {
  logger.info('Getting all todo lists');
  return todoListRepository.getAllTodoLists();
};

export const getTodoListById = async (id: string) => {
  logger.info(`Getting todo list with ID ${id}`);
  return todoListRepository.findById(id);
};

export const deleteTodoList = async (
  todoListId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(
      `Deleting todo list with ID ${todoListId} by user ${deletedBy}`,
    );

    const deletedTodoList = await todoListRepository.deleteTodoList(
      todoListId,
      deletedBy,
    );

    if (!deletedTodoList) {
      throw new Error(
        `Todo list profile with ID ${todoListId} not found`,
      );
    }
    return deletedTodoList;
  } catch (error: any) {
    throw new Error(`Error deleting todo list profile: ${error.message}`);
  }
};

export const updateTodoListStatus = async (
  id: string,
  updatedData: Partial<todoListsDocument>,
): Promise<todoListsDocument | null> => {
  try {
    logger.info(
      `Updating status for todo list with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await todoListRepository.changeTodoListStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Todo list profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'todoList',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for todo list profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(
      `Error updating todo list profile status: ${error.message}`,
    );
  }
};
