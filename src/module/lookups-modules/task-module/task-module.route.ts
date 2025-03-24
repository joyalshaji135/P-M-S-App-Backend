import { Router } from 'express';
import {
  createTaskModuleProfile,
  editTaskModuleProfile,
  deleteTaskModuleProfile,
  getTaskModuleById,
  getAllTaskModules,
  updateTaskModuleStatus,
} from './task-module.controllers'; // Updated import path

const router = Router();

// Updated route paths and function names
router.post('/create-task-module', createTaskModuleProfile);

router.patch('/:id/status-change-task-module', updateTaskModuleStatus);

router.put('/:id/update-task-module', editTaskModuleProfile);

router.delete('/:id/delete-task-module', deleteTaskModuleProfile);

router.get('/:id/get-by-id-task-module', getTaskModuleById);

router.get('/get-all-task-modules', getAllTaskModules);

export default router;