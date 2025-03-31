import { Router } from 'express';
import * as todoListControllers from './todo-lists.controllers';

const router = Router();

router.post('/create-todo-list', todoListControllers.createTodoListProfile);

router.put('/:id/update-todo-list', todoListControllers.editTodoListProfile);

router.delete(
  '/:id/delete-todo-list',
  todoListControllers.deleteTodoListProfile,
);

router.get('/:id/get-by-id-todo-list', todoListControllers.getTodoListById);

router.get('/get-all-todo-lists', todoListControllers.getAllTodoLists);

router.patch(
  '/:id/status-change-todo-list',
  todoListControllers.updateTodoListStatus,
);

export default router;
