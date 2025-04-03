import { Router } from 'express';
import * as segmentationRoutes from './segmentation-api.controllers';

const router = Router();

// Task Wise Client Get Api Methods
router.get(
  '/:client_id/task-wise-client',
  segmentationRoutes.taskAssignedClientController,
);

// Project Wise Client Get Api Methods
router.get(
  '/:client_id/project-wise-client',
  segmentationRoutes.projectAssignedClientController,
);

// Update Project Task 
router.put('/:task/update-project-task', segmentationRoutes.updateProjectTask);


// Get All Industry Projects
router.get(
  '/get-all-industry-projects',
  segmentationRoutes.getAllIndustryProjects,
);

// Get All Google Meeting
router.get('/get-all-google-meetings', segmentationRoutes.getAllGoogleMeetings);


// Get All File Documents Api
router.get('/get-all-file-documents', segmentationRoutes.getAllFileDocuments);


// router.patch('/:id/status', taskController.updateTaskStatus);

export default router;

