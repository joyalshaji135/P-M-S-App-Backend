import { NextFunction, Response } from 'express';
import * as todoListService from './todo-lists.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { todoListValidation } from '@validation/todo-lists/todo-lists.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createTodoListProfile = async (
  req: RequestWithAuthData,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const titleName = req.body.titleName;
    const nameAlias = titleName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/\./g, '');
    const lookupType = LookupTypes.TODO_LIST;
    const code = await generateNewLookupCode(lookupType);

    const todoListData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };
    // // Add Validation for TodoList
    // const { error } = todoListValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdTodoList =
      await todoListService.createTodoListProfile(todoListData);

    return res.status(201).json({
      success: true,
      message: message.TODO_LIST_CREATED_SUCCESS,
      todoList: createdTodoList,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editTodoListProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const todoListData = {
    ...req.body,
    userUpdatedDate: new Date(),
    userUpdatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    // Get TodoList By Id from the database
    const todoList = await todoListService.getTodoListById(id);

    if (!todoList) {
      return res.status(400).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }
    if (req.body.titleName) {
      const titleName = req.body.titleName;
      const nameAlias = titleName
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, '');
      todoListData.nameAlias = nameAlias;
    }

    const existingTodoList = await todoListService.getTodoListById(id);
    if (!existingTodoList) {
      return res.status(204).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }

    const updatedTodoList = await todoListService.editTodoListProfile(
      id,
      todoListData,
    );

    if (!updatedTodoList) {
      return res.status(204).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.TODO_LIST_UPDATED_SUCCESS,
      todoList: updatedTodoList,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTodoListProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const deletedTodoList = await todoListService.deleteTodoList(
      id,
      req.userId,
    );

    if (!deletedTodoList) {
      return res.status(204).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.TODO_LIST_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTodoListById = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const todoList = await todoListService.getTodoListById(id);

    if (todoList === null) {
      return res.status(400).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }

    if (!todoList) {
      return res.status(204).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      todoList,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTodoLists = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const todoLists = await todoListService.getAllTodoLists();

    if (todoLists.length === 0) {
      return res.status(400).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }

    if (!todoLists) {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_TODO_LISTS,
      });
    }

    return res.status(200).json({
      success: true,
      todoLists,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTodoListStatus = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }
  console.log(req.userId);
  const userStatusUpdateData = {
    ...req.body,
    userUpdatedBy: req.userId,
    userUpdatedDate: new Date(),
  };
  try {
    const todoList = await todoListService.getTodoListById(id);

    if (!todoList) {
      return res.status(400).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }
    const updatedTodoList = await todoListService.updateTodoListStatus(
      id,
      userStatusUpdateData,
    );

    if (!updatedTodoList) {
      return res.status(204).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.TODO_LIST_STATUS_UPDATED,
      todoList: updatedTodoList,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
