import express from 'express';

import * as teamMemberControllers from './team-members.controllers';

const router = express.Router();

// Create Team Member Routes
router.post(
  '/create-team-member',
  teamMemberControllers.createTeamMemberController,
);

// Get All Team Member Routes
router.get(
  '/get-all-team-members',
  teamMemberControllers.getAllTeamMembersController,
);

// Get Team Member By Id Routes
router.get(
  '/:id/get-by-id-team-member',
  teamMemberControllers.getTeamMemberByIdController,
);

// Update Team Member Routes
router.put(
  '/:id/update-team-member',
  teamMemberControllers.updateTeamMemberController,
);

// Delete Team Member Routes
router.delete(
  '/:id/delete-team-member',
  teamMemberControllers.deleteTeamMemberController,
);

// Update Team Member Status Routes
router.patch(
  '/:id/status-change-team-member',
  teamMemberControllers.updateTeamMemberStatusController,
);

export default router;
