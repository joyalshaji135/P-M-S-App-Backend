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
exports.updatePriorityStatus = exports.getAllPriorities = exports.getPriorityById = exports.deletePriorityProfile = exports.editPriorityProfile = exports.createPriorityProfile = void 0;
const priorityService = __importStar(require("./priority.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createPriorityProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.PRIORITY;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const priorityData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // const { error } = priorityValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdPriority = yield priorityService.createPriorityProfile(priorityData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.PRIORITY_CREATED_SUCCESS,
            priority: createdPriority,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createPriorityProfile = createPriorityProfile;
const editPriorityProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const priorityData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const priority = yield priorityService.getPriorityById(id);
        if (!priority) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.PRIORITY_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            priorityData.nameAlias = nameAlias;
        }
        const updatedPriority = yield priorityService.editPriorityProfile(id, priorityData);
        if (!updatedPriority) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.PRIORITY_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.PRIORITY_UPDATED_SUCCESS,
            priority: updatedPriority,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editPriorityProfile = editPriorityProfile;
const deletePriorityProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedPriority = yield priorityService.deletePriority(id, req.userId);
        if (!deletedPriority) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.PRIORITY_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.PRIORITY_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deletePriorityProfile = deletePriorityProfile;
const getPriorityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const priority = yield priorityService.getPriorityById(id);
        if (!priority) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.PRIORITY_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            priority,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getPriorityById = getPriorityById;
const getAllPriorities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const priorities = yield priorityService.getAllPriorities();
        if (priorities.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.PRIORITY_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            priorities,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllPriorities = getAllPriorities;
const updatePriorityStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: responseMessage_1.message.UNAUTHORIZED,
        });
    }
    const statusUpdateData = Object.assign(Object.assign({}, req.body), { userUpdatedBy: req.userId, userUpdatedDate: new Date() });
    try {
        const priority = yield priorityService.getPriorityById(id);
        if (!priority) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.PRIORITY_NOT_FOUND,
            });
        }
        const updatedPriority = yield priorityService.updatePriorityStatus(id, statusUpdateData);
        if (!updatedPriority) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.PRIORITY_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.PRIORITY_STATUS_UPDATED,
            priority: updatedPriority,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updatePriorityStatus = updatePriorityStatus;
