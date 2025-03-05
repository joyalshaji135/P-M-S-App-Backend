import { Router } from 'express';
import {
  createTodoListProfile,
  editTodoListProfile,
  deleteTodoListProfile
//   getTodoListById,
//   getAllTodoLists,
//   updateTodoListStatus,
} from './todo-lists.controllers';

const router = Router();

router.post('/create-todo-list', createTodoListProfile);

// router.patch('/:id/status-change-todo-list', updateTodoListStatus);

router.put('/:id/update-todo-list', editTodoListProfile);

router.delete('/:id/delete-todo-list', deleteTodoListProfile);

// router.get('/:id/get-by-id-todo-list', getTodoListById);

// router.get('/get-all-todo-lists', getAllTodoLists);

export default router;
