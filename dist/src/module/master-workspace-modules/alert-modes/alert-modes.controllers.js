"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAlertModeStatus = exports.getAlertModeById = exports.getAllAlertModes = exports.deleteAlertModeProfile = exports.editAlertModeProfile = exports.createAlertModeProfile = void 0;
const alertModeService = __importStar(require("./alert-modes.services")); // Update the import path
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createAlertModeProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const { code, message: alertMessage, severity, customer } = req.body;
        // Generate a new lookup code if needed
        const lookupType = lookup_1.LookupTypes.ALERT_MODE; // Update the lookup type if necessary
        const generatedCode = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const alertModeData = {
            code: generatedCode,
            message: alertMessage,
            severity,
            customer,
            createdBy: req.userId,
            triggeredAt: new Date(),
        };
        // Uncomment if validation is needed
        // const { error } = alertModeValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdAlertMode = yield alertModeService.createAlertModeProfile(alertModeData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.ALERT_MODE_CREATED_SUCCESS, // Update the success message
            alertMode: createdAlertMode,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createAlertModeProfile = createAlertModeProfile;
const editAlertModeProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alertModeData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get AlertMode By Id from the database
        const alertMode = yield alertModeService.getAlertModeById(id);
        if (!alertMode) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.ALERT_MODE_NOT_FOUND, // Update the error message
            });
        }
        const existingAlertMode = yield alertModeService.getAlertModeById(id);
        if (!existingAlertMode) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.ALERT_MODE_NOT_FOUND, // Update the error message
            });
        }
        const updatedAlertMode = yield alertModeService.editAlertModeProfile(id, alertModeData);
        if (!updatedAlertMode) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.ALERT_MODE_NOT_FOUND, // Update the error message
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.ALERT_MODE_UPDATED_SUCCESS, // Update the success message
            alertMode: updatedAlertMode,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editAlertModeProfile = editAlertModeProfile;
const deleteAlertModeProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedAlertMode = yield alertModeService.deleteAlertMode(id, req.userId);
        if (!deletedAlertMode) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.ALERT_MODE_NOT_FOUND, // Update the error message
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.ALERT_MODE_DELETED, // Update the success message
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteAlertModeProfile = deleteAlertModeProfile;
const getAllAlertModes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alertModes = yield alertModeService.getAllAlertModes();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.ALERT_MODES_FETCHED_SUCCESS, // Update the success message
            alertModes,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllAlertModes = getAllAlertModes;
const getAlertModeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const alertMode = yield alertModeService.getAlertModeById(id);
        if (!alertMode) {
            return res.status(404).json({
                success: false,
                message: responseMessage_1.message.ALERT_MODE_NOT_FOUND, // Update the error message
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.ALERT_MODE_FETCHED_SUCCESS, // Update the success message
            alertMode,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAlertModeById = getAlertModeById;
const updateAlertModeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { alertStatus, userUpdatedBy } = req.body;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const updatedAlertMode = yield alertModeService.updateAlertModeStatus(id, {
            alertStatus,
            userUpdatedBy: req.userId,
            userUpdatedDate: new Date(),
        });
        if (!updatedAlertMode) {
            return res.status(404).json({
                success: false,
                message: responseMessage_1.message.ALERT_MODE_NOT_FOUND, // Update the error message
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.ALERT_MODE_STATUS_UPDATED, // Update the success message
            alertMode: updatedAlertMode,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateAlertModeStatus = updateAlertModeStatus;
