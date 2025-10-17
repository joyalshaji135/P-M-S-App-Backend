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
exports.updateLookupCodeStatus = exports.deleteLookupCode = exports.editLookupCode = exports.getLookupCodeById = exports.getAllLookupCodes = exports.createLookupCode = void 0;
const lookupCodeService = __importStar(require("./lookup-code.services"));
const responseMessage_1 = require("@constants/responseMessage");
const createLookupCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, name, code, firstNumber, lastNumber } = req.body;
    if (!req.userId) {
        res.status(401).json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        return;
    }
    const createdBy = req.userId;
    try {
        const newLookupCode = yield lookupCodeService.createLookupCode({
            type,
            name,
            code,
            firstNumber,
            lastNumber,
            createdBy,
        });
        res.status(201).json({
            success: true,
            message: responseMessage_1.message.LOOKUP_CODE_CREATED_SUCCESS, // Ensure this message exists in your message constants
            lookupCode: newLookupCode,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createLookupCode = createLookupCode;
const getAllLookupCodes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const lookupCodes = yield lookupCodeService.getAllLookupCodes();
        if (lookupCodes.length > 0) {
            res.status(200).json({ success: true, lookupCodes });
        }
        else {
            res.status(400).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_LOOKUP_CODES,
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.getAllLookupCodes = getAllLookupCodes;
const getLookupCodeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const lookupCode = yield lookupCodeService.getLookupCodeById(id);
        if (!lookupCode) {
            return res
                .status(400)
                .json({ success: false, message: responseMessage_1.message.LOOKUP_CODE_NOT_FOUND });
        }
        res.status(200).json({ success: true, lookupCode });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getLookupCodeById = getLookupCodeById;
const editLookupCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const lookupCodeData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const existingLookupCode = yield lookupCodeService.getLookupCodeById(id);
        if (!existingLookupCode) {
            return res
                .status(204)
                .json({ success: false, message: responseMessage_1.message.LOOKUP_CODE_NOT_FOUND });
        }
        const updatedLookupCode = yield lookupCodeService.editLookupCode(id, lookupCodeData);
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.LOOKUP_CODE_UPDATED_SUCCESS,
            lookupCode: updatedLookupCode,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.editLookupCode = editLookupCode;
const deleteLookupCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            res.status(401).json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
            return;
        }
        const deletedLookupCode = yield lookupCodeService.deleteLookupCode(id, req.userId);
        if (!deletedLookupCode) {
            return res
                .status(204)
                .json({ success: false, message: responseMessage_1.message.LOOKUP_CODE_NOT_FOUND });
        }
        res
            .status(200)
            .json({ success: true, message: responseMessage_1.message.LOOKUP_CODE_DELETED });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteLookupCode = deleteLookupCode;
// Status update for lookup code
const updateLookupCodeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const updatedData = {
        status,
        userUpdatedBy: req.userId,
        userUpdatedDate: new Date(),
    };
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const updatedLookupCode = yield lookupCodeService.updateLookupCodeStatus(id, updatedData, req.userId);
        if (!updatedLookupCode) {
            return res
                .status(204)
                .json({ success: false, message: responseMessage_1.message.LOOKUP_CODE_NOT_FOUND });
        }
        return res
            .status(200)
            .json({ success: true, message: responseMessage_1.message.LOOKUP_CODE_STATUS_UPDATED });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateLookupCodeStatus = updateLookupCodeStatus;
