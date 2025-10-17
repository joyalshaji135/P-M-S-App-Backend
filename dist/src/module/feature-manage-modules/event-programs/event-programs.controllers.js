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
exports.updateEventProgramsStatus = exports.getAllEventPrograms = exports.getEventProgramsById = exports.deleteEventProgramsProfile = exports.editEventProgramsProfile = exports.createEventProgramsProfile = void 0;
const eventProgramsService = __importStar(require("./event-programs.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createEventProgramsProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.EVENT_PROGRAMS;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const eventProgramsData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // Add Validation for EventPrograms
        // const { error } = eventProgramsValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdEventPrograms = yield eventProgramsService.createEventProgram(eventProgramsData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.EVENT_PROGRAMS_CREATED_SUCCESS,
            eventPrograms: createdEventPrograms,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createEventProgramsProfile = createEventProgramsProfile;
const editEventProgramsProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eventProgramsData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get EventPrograms By Id from the database
        const eventPrograms = yield eventProgramsService.getEventProgramById(id);
        if (!eventPrograms) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.EVENT_PROGRAMS_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            eventProgramsData.nameAlias = nameAlias;
        }
        const existingEventPrograms = yield eventProgramsService.getEventProgramById(id);
        if (!existingEventPrograms) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.EVENT_PROGRAMS_NOT_FOUND,
            });
        }
        const updatedEventPrograms = yield eventProgramsService.editEventProgram(id, eventProgramsData);
        if (!updatedEventPrograms) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.EVENT_PROGRAMS_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.EVENT_PROGRAMS_UPDATED_SUCCESS,
            eventPrograms: updatedEventPrograms,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editEventProgramsProfile = editEventProgramsProfile;
const deleteEventProgramsProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedEventPrograms = yield eventProgramsService.deleteEventProgram(id, req.userId);
        if (!deletedEventPrograms) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.EVENT_PROGRAMS_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.EVENT_PROGRAMS_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteEventProgramsProfile = deleteEventProgramsProfile;
const getEventProgramsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const eventPrograms = yield eventProgramsService.getEventProgramById(id);
        if (eventPrograms === null) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.EVENT_PROGRAMS_NOT_FOUND,
            });
        }
        if (!eventPrograms) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.EVENT_PROGRAMS_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            eventPrograms,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getEventProgramsById = getEventProgramsById;
const getAllEventPrograms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const eventPrograms = yield eventProgramsService.getAllEventPrograms();
        if (eventPrograms.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.EVENT_PROGRAMS_NOT_FOUND,
            });
        }
        if (!eventPrograms) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_EVENT_PROGRAMS,
            });
        }
        return res.status(200).json({
            success: true,
            eventPrograms,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllEventPrograms = getAllEventPrograms;
const updateEventProgramsStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: responseMessage_1.message.UNAUTHORIZED,
        });
    }
    console.log(req.userId);
    const userStatusUpdateData = Object.assign(Object.assign({}, req.body), { userUpdatedBy: req.userId, userUpdatedDate: new Date() });
    try {
        const eventPrograms = yield eventProgramsService.getEventProgramById(id);
        if (!eventPrograms) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.EVENT_PROGRAMS_NOT_FOUND,
            });
        }
        const updatedEventPrograms = yield eventProgramsService.updateEventProgramStatus(id, userStatusUpdateData);
        if (!updatedEventPrograms) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.EVENT_PROGRAMS_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.EVENT_PROGRAMS_STATUS_UPDATED,
            eventPrograms: updatedEventPrograms,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateEventProgramsStatus = updateEventProgramsStatus;
