"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alert_modes_controllers_1 = require("./alert-modes.controllers");
const router = (0, express_1.Router)();
// Create a new alert mode
router.post('/create-alert-mode', alert_modes_controllers_1.createAlertModeProfile);
// Update an alert mode's status
router.patch('/:id/status-change-alert-mode', alert_modes_controllers_1.updateAlertModeStatus);
// Update an alert mode
router.put('/:id/update-alert-mode', alert_modes_controllers_1.editAlertModeProfile);
// Delete an alert mode
router.delete('/:id/delete-alert-mode', alert_modes_controllers_1.deleteAlertModeProfile);
// Get an alert mode by ID
router.get('/:id/get-by-id-alert-mode', alert_modes_controllers_1.getAlertModeById);
// Get all alert modes
router.get('/get-all-alert-modes', alert_modes_controllers_1.getAllAlertModes);
exports.default = router;
