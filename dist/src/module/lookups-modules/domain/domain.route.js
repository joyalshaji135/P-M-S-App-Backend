"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const domain_controllers_1 = require("./domain.controllers"); // Updated import path
const router = (0, express_1.Router)();
// Updated route paths and function names
router.post('/create-domain', domain_controllers_1.createDomainProfile);
router.patch('/:id/status-change-domain', domain_controllers_1.updateDomainStatus);
router.put('/:id/update-domain', domain_controllers_1.editDomainProfile);
router.delete('/:id/delete-domain', domain_controllers_1.deleteDomainProfile);
router.get('/:id/get-by-id-domain', domain_controllers_1.getDomainById);
router.get('/get-all-domain', domain_controllers_1.getAllDomains);
exports.default = router;
