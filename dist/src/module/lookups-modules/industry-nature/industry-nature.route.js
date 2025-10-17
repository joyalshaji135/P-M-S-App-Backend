"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const industry_nature_controllers_1 = require("./industry-nature.controllers"); // Updated import path
const router = (0, express_1.Router)();
// Updated route paths and function names
router.post('/create-industry-nature', industry_nature_controllers_1.createIndustryNatureProfile);
router.patch('/:id/status-change-industry-nature', industry_nature_controllers_1.updateIndustryNatureStatus);
router.put('/:id/update-industry-nature', industry_nature_controllers_1.editIndustryNatureProfile);
router.delete('/:id/delete-industry-nature', industry_nature_controllers_1.deleteIndustryNatureProfile);
router.get('/:id/get-by-id-industry-nature', industry_nature_controllers_1.getIndustryNatureById);
router.get('/get-all-industry-natures', industry_nature_controllers_1.getAllIndustryNatures);
exports.default = router;
