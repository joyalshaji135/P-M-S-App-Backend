"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_feedbacks_controllers_1 = require("./clients-feedbacks.controllers");
const router = (0, express_1.Router)();
// Create a new client feedback
router.post('/create-client-feedback', clients_feedbacks_controllers_1.createClientFeedbackProfile);
// Update a client feedback's status
router.patch('/:id/status-change-client-feedback', clients_feedbacks_controllers_1.updateClientFeedbackStatus);
// Update a client feedback
router.put('/:id/update-client-feedback', clients_feedbacks_controllers_1.editClientFeedbackProfile);
// Delete a client feedback
router.delete('/:id/delete-client-feedback', clients_feedbacks_controllers_1.deleteClientFeedbackProfile);
// Get a client feedback by ID
router.get('/:id/get-by-id-client-feedback', clients_feedbacks_controllers_1.getClientFeedbackById);
// Get all client feedbacks
router.get('/get-all-client-feedbacks', clients_feedbacks_controllers_1.getAllClientFeedbacks);
exports.default = router;
