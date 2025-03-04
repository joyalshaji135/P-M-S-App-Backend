import { Router } from 'express';
import * as taskRolesControllers from './task-roles.controllers';

const router = Router();

router.post(
  '/create-task-role',
  taskRolesControllers.createTaskRole,
);

router.patch(
  '/:id/status-change-task-role',
  taskRolesControllers.updateTaskRoleStatus,
);

router.put(
  '/:id/update-task-role',
  taskRolesControllers.editTaskRole,
);

router.delete(
  '/:id/delete-task-role',
  taskRolesControllers.deleteTaskRole,
);

router.get(
  '/:id/get-by-id-task-role',
  taskRolesControllers.getTaskRoleById,
);

router.get(
  '/get-all-task-roles',
  taskRolesControllers.getAllTaskRoles,
);

export default router;
