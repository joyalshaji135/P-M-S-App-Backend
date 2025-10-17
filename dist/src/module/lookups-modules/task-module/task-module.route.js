"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_module_controllers_1 = require("./task-module.controllers"); // Updated import path
const router = (0, express_1.Router)();
// Updated route paths and function names
router.post('/create-task-module', task_module_controllers_1.createTaskModuleProfile);
router.patch('/:id/status-change-task-module', task_module_controllers_1.updateTaskModuleStatus);
router.put('/:id/update-task-module', task_module_controllers_1.editTaskModuleProfile);
router.delete('/:id/delete-task-module', task_module_controllers_1.deleteTaskModuleProfile);
router.get('/:id/get-by-id-task-module', task_module_controllers_1.getTaskModuleById);
router.get('/get-all-task-modules', task_module_controllers_1.getAllTaskModules);
exports.default = router;
