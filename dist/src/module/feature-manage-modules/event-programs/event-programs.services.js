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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventProgramStatus = exports.deleteEventProgram = exports.getEventProgramById = exports.getAllEventPrograms = exports.editEventProgram = exports.createEventProgram = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const eventProgramsRepository = __importStar(require("./event-programs.repositorys"));
const createEventProgram = (eventProgramData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new event program', { eventProgramData });
        if (!eventProgramData.name) {
            throw new Error('Event program name is required.');
        }
        if (!eventProgramData.nameAlias) {
            throw new Error('Event program name alias is required.');
        }
        const existingEventProgramByName = yield eventProgramsRepository.isNameExists(eventProgramData.name);
        const existingEventProgramByAlias = yield eventProgramsRepository.isNameAliasExists(eventProgramData.nameAlias);
        if (existingEventProgramByName) {
            throw new Error('An event program with the same name already exists.');
        }
        if (existingEventProgramByAlias) {
            throw new Error('An event program with the same name alias already exists.');
        }
        const newEventProgram = yield eventProgramsRepository.create(eventProgramData);
        yield log_model_1.default.create({
            userId: newEventProgram.createdBy,
            module: 'eventProgram',
            action: 'create',
            actionId: newEventProgram._id,
            description: `Created a new event program with name: ${newEventProgram.name}`,
        });
        return newEventProgram;
    }
    catch (error) {
        throw new Error(`Error creating event program: ${error.message}`);
    }
});
exports.createEventProgram = createEventProgram;
const editEventProgram = (eventProgramId, eventProgramData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing event program with ID ${eventProgramId}`, {
            eventProgramData,
        });
        if (eventProgramData.name) {
            const existingEventProgram = yield eventProgramsRepository.isNameExists(eventProgramData.name, eventProgramId);
            if (existingEventProgram) {
                throw new Error('An event program with the same name already exists.');
            }
        }
        if (eventProgramData.nameAlias) {
            const existingEventProgram = yield eventProgramsRepository.isNameAliasExists(eventProgramData.nameAlias, eventProgramId);
            if (existingEventProgram) {
                throw new Error('An event program with the same name alias already exists.');
            }
        }
        const updatedEventProgram = yield eventProgramsRepository.updateById(eventProgramId, eventProgramData);
        if (!updatedEventProgram) {
            throw new Error(`Event program with ID ${eventProgramId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedEventProgram.userUpdatedBy,
            module: 'eventProgram',
            action: 'edit',
            actionId: updatedEventProgram._id,
            description: `Updated event program with ID ${eventProgramId}`,
        });
        return updatedEventProgram;
    }
    catch (error) {
        throw new Error(`Error updating event program: ${error.message}`);
    }
});
exports.editEventProgram = editEventProgram;
const getAllEventPrograms = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all event programs');
    return eventProgramsRepository.getAllEventPrograms();
});
exports.getAllEventPrograms = getAllEventPrograms;
const getEventProgramById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting event program with ID ${id}`);
    return eventProgramsRepository.findById(id);
});
exports.getEventProgramById = getEventProgramById;
const deleteEventProgram = (eventProgramId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting event program with ID ${eventProgramId} by user ${deletedBy}`);
        const deletedEventProgram = yield eventProgramsRepository.deleteEventProgram(eventProgramId, deletedBy);
        if (!deletedEventProgram) {
            throw new Error(`Event program with ID ${eventProgramId} not found`);
        }
        return deletedEventProgram;
    }
    catch (error) {
        throw new Error(`Error deleting event program: ${error.message}`);
    }
});
exports.deleteEventProgram = deleteEventProgram;
const updateEventProgramStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for event program with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield eventProgramsRepository.changeEventProgramStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Event program with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'eventProgram',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for event program with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating event program status: ${error.message}`);
    }
});
exports.updateEventProgramStatus = updateEventProgramStatus;
