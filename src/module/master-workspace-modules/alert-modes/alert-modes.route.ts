import { Router } from 'express';
import {
  createAlertModeProfile,
  editAlertModeProfile,
  deleteAlertModeProfile,
  getAlertModeById,
  getAllAlertModes,
  updateAlertModeStatus,
} from './alert-modes.controllers';

const router = Router();

// Create a new alert mode
router.post('/create-alert-mode', createAlertModeProfile);

// Update an alert mode's status
router.patch('/:id/status-change-alert-mode', updateAlertModeStatus);

// Update an alert mode
router.put('/:id/update-alert-mode', editAlertModeProfile);

// Delete an alert mode
router.delete('/:id/delete-alert-mode', deleteAlertModeProfile);

// Get an alert mode by ID
router.get('/:id/get-by-id-alert-mode', getAlertModeById);

// Get all alert modes
router.get('/get-all-alert-modes', getAllAlertModes);

export default router;
