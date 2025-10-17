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
exports.updateDocumentStatus = exports.deleteDocument = exports.getDocumentById = exports.getAllDocuments = exports.editDocumentProfile = exports.createDocumentProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const documentRepository = __importStar(require("./document-files.repositorys"));
const createDocumentProfile = (documentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new document profile', { documentData });
        if (!documentData.name) {
            throw new Error('Document name is required.');
        }
        if (!documentData.nameAlias) {
            throw new Error('Document name alias is required.');
        }
        const existingDocumentByName = yield documentRepository.isNameExists(documentData.name);
        const existingDocumentByAlias = yield documentRepository.isNameAliasExists(documentData.nameAlias);
        if (existingDocumentByName) {
            throw new Error('A document with the same name already exists.');
        }
        if (existingDocumentByAlias) {
            throw new Error('A document with the same name alias already exists.');
        }
        const newDocumentProfile = yield documentRepository.create(documentData);
        yield log_model_1.default.create({
            userId: newDocumentProfile.createdBy,
            module: 'document',
            action: 'create',
            actionId: newDocumentProfile._id,
            description: `Created a new document profile with name: ${newDocumentProfile.name}`,
        });
        return newDocumentProfile;
    }
    catch (error) {
        throw new Error(`Error creating document profile: ${error.message}`);
    }
});
exports.createDocumentProfile = createDocumentProfile;
const editDocumentProfile = (documentId, documentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing document profile with ID ${documentId}`, {
            documentData,
        });
        if (documentData.name) {
            const existingDocument = yield documentRepository.isNameExists(documentData.name, documentId);
            if (existingDocument) {
                throw new Error('A document with the same name already exists.');
            }
        }
        if (documentData.nameAlias) {
            const existingDocument = yield documentRepository.isNameAliasExists(documentData.nameAlias, documentId);
            if (existingDocument) {
                throw new Error('A document with the same name alias already exists.');
            }
        }
        const updatedDocumentProfile = yield documentRepository.updateById(documentId, documentData);
        if (!updatedDocumentProfile) {
            throw new Error(`Document profile with ID ${documentId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedDocumentProfile.userUpdatedBy,
            module: 'document',
            action: 'edit',
            actionId: updatedDocumentProfile._id,
            description: `Updated document profile with ID ${documentId}`,
        });
        return updatedDocumentProfile;
    }
    catch (error) {
        throw new Error(`Error updating document profile: ${error.message}`);
    }
});
exports.editDocumentProfile = editDocumentProfile;
const getAllDocuments = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all documents');
    return documentRepository.getAllDocumentFiles();
});
exports.getAllDocuments = getAllDocuments;
const getDocumentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting document with ID ${id}`);
    return documentRepository.findById(id);
});
exports.getDocumentById = getDocumentById;
const deleteDocument = (documentId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting document with ID ${documentId} by user ${deletedBy}`);
        const deletedDocument = yield documentRepository.deleteDocumentFile(documentId, deletedBy);
        if (!deletedDocument) {
            throw new Error(`Document profile with ID ${documentId} not found`);
        }
        return deletedDocument;
    }
    catch (error) {
        throw new Error(`Error deleting document profile: ${error.message}`);
    }
});
exports.deleteDocument = deleteDocument;
const updateDocumentStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for document with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield documentRepository.changeDocumentFileStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Document profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'document',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for document profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating document profile status: ${error.message}`);
    }
});
exports.updateDocumentStatus = updateDocumentStatus;
