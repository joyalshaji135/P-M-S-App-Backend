import { Router } from 'express';
import * as segmentationRoutes from './segmentation-api.controllers';

const router = Router();

// Task Wise Client Get Api Methods
router.get('/:client_id/task-wise-client', segmentationRoutes.taskAssignedClientController)

export default router;