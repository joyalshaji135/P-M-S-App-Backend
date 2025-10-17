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
exports.updateDocumentFileStatus = exports.getAllDocumentFiles = exports.getDocumentFileById = exports.deleteDocumentFileProfile = exports.editDocumentFileProfile = exports.createDocumentFileProfile = void 0;
const documentFileService = __importStar(require("./document-files.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createDocumentFileProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.DOCUMENT_FILE;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const documentFileData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // Add Validation for DocumentFile
        // const { error } = documentFileValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdDocumentFile = yield documentFileService.createDocumentProfile(documentFileData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.DOCUMENT_FILE_CREATED_SUCCESS,
            documentFile: createdDocumentFile,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createDocumentFileProfile = createDocumentFileProfile;
const editDocumentFileProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const documentFileData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get DocumentFile By Id from the database
        const documentFile = yield documentFileService.getDocumentById(id);
        if (!documentFile) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.DOCUMENT_FILE_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            documentFileData.nameAlias = nameAlias;
        }
        const existingDocumentFile = yield documentFileService.getDocumentById(id);
        if (!existingDocumentFile) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.DOCUMENT_FILE_NOT_FOUND,
            });
        }
        const updatedDocumentFile = yield documentFileService.editDocumentProfile(id, documentFileData);
        if (!updatedDocumentFile) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.DOCUMENT_FILE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.DOCUMENT_FILE_UPDATED_SUCCESS,
            documentFile: updatedDocumentFile,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editDocumentFileProfile = editDocumentFileProfile;
const deleteDocumentFileProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedDocumentFile = yield documentFileService.deleteDocument(id, req.userId);
        if (!deletedDocumentFile) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.DOCUMENT_FILE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.DOCUMENT_FILE_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteDocumentFileProfile = deleteDocumentFileProfile;
const getDocumentFileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const documentFile = yield documentFileService.getDocumentById(id);
        if (documentFile === null) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.DOCUMENT_FILE_NOT_FOUND,
            });
        }
        if (!documentFile) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.DOCUMENT_FILE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            documentFile,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getDocumentFileById = getDocumentFileById;
const getAllDocumentFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const documentFiles = yield documentFileService.getAllDocuments();
        if (documentFiles.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.DOCUMENT_FILE_NOT_FOUND,
            });
        }
        if (!documentFiles) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_DOCUMENT_FILES,
            });
        }
        return res.status(200).json({
            success: true,
            documentFiles,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllDocumentFiles = getAllDocumentFiles;
const updateDocumentFileStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const documentFile = yield documentFileService.getDocumentById(id);
        if (!documentFile) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.DOCUMENT_FILE_NOT_FOUND,
            });
        }
        const updatedDocumentFile = yield documentFileService.updateDocumentStatus(id, userStatusUpdateData);
        if (!updatedDocumentFile) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.DOCUMENT_FILE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.DOCUMENT_FILE_STATUS_UPDATED,
            documentFile: updatedDocumentFile,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateDocumentFileStatus = updateDocumentFileStatus;
