"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lookup_code_controllers_1 = require("./lookup-code.controllers");
const router = express_1.default.Router();
router.post('/create-lookup-code', lookup_code_controllers_1.createLookupCode);
router.get('/get-all-lookup-code', lookup_code_controllers_1.getAllLookupCodes);
router.get('/:id/get-by-id-lookup-code', lookup_code_controllers_1.getLookupCodeById);
router.put('/:id/update-lookup-code', lookup_code_controllers_1.editLookupCode);
router.delete('/:id/delete-lookup-code', lookup_code_controllers_1.deleteLookupCode);
router.patch('/:id/status-change-lookup-code', lookup_code_controllers_1.updateLookupCodeStatus);
exports.default = router;
