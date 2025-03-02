import express from 'express';

import * as teamManagerControllers from './team-managers.controllers';

const router = express.Router();

// Create Team Manager Routes
router.post(
  '/create-team-manager',
  teamManagerControllers.createTeamManagerController,
);

// Get All Team Manager Routes
router.get(
  '/get-all-team-managers',
  teamManagerControllers.getAllTeamManagersController,
);

// Get Team Manager By Id Routes
router.get(
  '/:id/get-by-id-team-manager',
  teamManagerControllers.getTeamManagerByIdController,
);

// Update Team Manager Routes
router.put(
  '/:id/update-team-manager',
  teamManagerControllers.updateTeamManagerController,
);

// Delete Team Manager Routes
router.delete(
  '/:id/delete-team-manager',
  teamManagerControllers.deleteTeamManagerController,
);

// Update Team Manager Status Routes
router.patch(
  '/:id/status-change-team-manager',
  teamManagerControllers.updateTeamManagerStatusController,
);

export default router;
