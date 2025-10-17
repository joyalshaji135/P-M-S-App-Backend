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
exports.updateDomainStatus = exports.getAllDomains = exports.getDomainById = exports.deleteDomainProfile = exports.editDomainProfile = exports.createDomainProfile = void 0;
const domainService = __importStar(require("./domain.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createDomainProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.DOMAIN;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const domainData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // Add Validation for Domain
        // const { error } = domainValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdDomain = yield domainService.createDomainProfile(domainData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.DOMAIN_CREATED_SUCCESS,
            domain: createdDomain,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createDomainProfile = createDomainProfile;
const editDomainProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const domainData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get Domain By Id from the database
        const domain = yield domainService.getDomainById(id);
        if (!domain) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.DOMAIN_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            domainData.nameAlias = nameAlias;
        }
        const existingDomain = yield domainService.getDomainById(id);
        if (!existingDomain) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.DOMAIN_NOT_FOUND,
            });
        }
        const updatedDomain = yield domainService.editDomainProfile(id, domainData);
        if (!updatedDomain) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.DOMAIN_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.DOMAIN_UPDATED_SUCCESS,
            domain: updatedDomain,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editDomainProfile = editDomainProfile;
const deleteDomainProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedDomain = yield domainService.deleteDomain(id, req.userId);
        if (!deletedDomain) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.DOMAIN_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.DOMAIN_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteDomainProfile = deleteDomainProfile;
const getDomainById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const domain = yield domainService.getDomainById(id);
        // Domain is not present in the database  400 "Domain Not Found Message"
        if (domain === null) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.DOMAIN_NOT_FOUND,
            });
        }
        if (!domain) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.DOMAIN_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            domain,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getDomainById = getDomainById;
const getAllDomains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const domains = yield domainService.getAllDomains();
        // Domain is not present in the database  400 "Domain Not Found Message"
        if (domains.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.DOMAIN_NOT_FOUND,
            });
        }
        if (!domains) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_DOMAINS,
            });
        }
        return res.status(200).json({
            success: true,
            domains,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllDomains = getAllDomains;
const updateDomainStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Get Domain By Id from the database
        const domain = yield domainService.getDomainById(id);
        if (!domain) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.DOMAIN_NOT_FOUND,
            });
        }
        const updatedDomain = yield domainService.updateDomainStatus(id, userStatusUpdateData);
        if (!updatedDomain) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.DOMAIN_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.DOMAIN_STATUS_UPDATED,
            domain: updatedDomain,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateDomainStatus = updateDomainStatus;
