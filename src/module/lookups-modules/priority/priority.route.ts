import { Router } from 'express';
import * as priorityController from './priority.controllers'; // Updated import path

const router = Router();

// Updated route paths and function names
router.post('/create-priority', priorityController.createPriorityProfile);

router.patch(
  '/:id/status-change-priority',
  priorityController.updatePriorityStatus,
);

router.put('/:id/update-priority', priorityController.editPriorityProfile);

router.delete('/:id/delete-priority', priorityController.deletePriorityProfile);

router.get('/:id/get-by-id-priority', priorityController.getPriorityById);

router.get('/get-all-priority', priorityController.getAllPriorities);

export default router;
