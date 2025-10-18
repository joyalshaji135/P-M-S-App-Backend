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
exports.deleteContactUs = exports.getContactUsById = exports.getAllContactUs = exports.addContactUs = void 0;
const contactUsService = __importStar(require("./contact-us.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
// addContactUs
const addContactUs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.CONTACT_US;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const contactUsData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        const createdContactUs = yield contactUsService.createContactUsProfile(contactUsData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.CONTACT_US_CREATED_SUCCESS,
            contactUs: createdContactUs,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.addContactUs = addContactUs;
// getAllContactUs
const getAllContactUs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const contactUs = yield contactUsService.getAllContactUsProfile();
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_ALL_CONTACT_US_SUCCESS,
            contactUs,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllContactUs = getAllContactUs;
// getContactUsById
const getContactUsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const contactUsId = req.params.contactUsId;
        const contactUs = yield contactUsService.getContactUsById(contactUsId);
        if (!contactUs) {
            return res.status(404).json({
                success: false,
                message: responseMessage_1.message.CONTACT_US_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GET_CONTACT_US_SUCCESS,
            contactUs,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getContactUsById = getContactUsById;
// deleteContactUs
const deleteContactUs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const contactUsId = req.params.contactUsId;
        const deletedContactUs = yield contactUsService.deleteContactUs(contactUsId);
        if (!deletedContactUs) {
            return res.status(404).json({
                success: false,
                message: responseMessage_1.message.CONTACT_US_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.CONTACT_US_DELETED_SUCCESS,
            contactUs: deletedContactUs,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteContactUs = deleteContactUs;
