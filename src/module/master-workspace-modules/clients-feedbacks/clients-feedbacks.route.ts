import { Router } from 'express';
import {
  createClientFeedbackProfile,
  editClientFeedbackProfile,
  deleteClientFeedbackProfile,
  getClientFeedbackById,
  getAllClientFeedbacks,
  updateClientFeedbackStatus,
} from './clients-feedbacks.controllers';

const router = Router();

// Create a new client feedback
router.post('/create-client-feedback', createClientFeedbackProfile);

// Update a client feedback's status
router.patch('/:id/status-change-client-feedback', updateClientFeedbackStatus);

// Update a client feedback
router.put('/:id/update-client-feedback', editClientFeedbackProfile);

// Delete a client feedback
router.delete('/:id/delete-client-feedback', deleteClientFeedbackProfile);

// Get a client feedback by ID
router.get('/:id/get-by-id-client-feedback', getClientFeedbackById);

// Get all client feedbacks
router.get('/get-all-client-feedbacks', getAllClientFeedbacks);

export default router;
