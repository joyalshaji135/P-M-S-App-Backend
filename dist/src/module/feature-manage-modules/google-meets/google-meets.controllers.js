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
exports.updateGoogleMeetStatus = exports.getAllGoogleMeets = exports.getGoogleMeetById = exports.deleteGoogleMeetProfile = exports.editGoogleMeetProfile = exports.createGoogleMeetProfile = void 0;
const googleMeetService = __importStar(require("./google-meets.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createGoogleMeetProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.GOOGLE_MEET;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const googleMeetData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // Add Validation for GoogleMeet
        // const { error } = googleMeetValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdGoogleMeet = yield googleMeetService.createGoogleMeetProfile(googleMeetData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.GOOGLE_MEET_CREATED_SUCCESS,
            googleMeet: createdGoogleMeet,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createGoogleMeetProfile = createGoogleMeetProfile;
const editGoogleMeetProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const googleMeetData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get GoogleMeet By Id from the database
        const googleMeet = yield googleMeetService.getGoogleMeetById(id);
        if (!googleMeet) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.GOOGLE_MEET_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            googleMeetData.nameAlias = nameAlias;
        }
        const existingGoogleMeet = yield googleMeetService.getGoogleMeetById(id);
        if (!existingGoogleMeet) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.GOOGLE_MEET_NOT_FOUND,
            });
        }
        const updatedGoogleMeet = yield googleMeetService.editGoogleMeetProfile(id, googleMeetData);
        if (!updatedGoogleMeet) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.GOOGLE_MEET_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GOOGLE_MEET_UPDATED_SUCCESS,
            googleMeet: updatedGoogleMeet,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editGoogleMeetProfile = editGoogleMeetProfile;
const deleteGoogleMeetProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedGoogleMeet = yield googleMeetService.deleteGoogleMeet(id, req.userId);
        if (!deletedGoogleMeet) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.GOOGLE_MEET_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GOOGLE_MEET_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteGoogleMeetProfile = deleteGoogleMeetProfile;
const getGoogleMeetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const googleMeet = yield googleMeetService.getGoogleMeetById(id);
        if (googleMeet === null) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.GOOGLE_MEET_NOT_FOUND,
            });
        }
        if (!googleMeet) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.GOOGLE_MEET_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            googleMeet,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getGoogleMeetById = getGoogleMeetById;
const getAllGoogleMeets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const googleMeets = yield googleMeetService.getAllGoogleMeets();
        if (googleMeets.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.GOOGLE_MEET_NOT_FOUND,
            });
        }
        if (!googleMeets) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_GOOGLE_MEETS,
            });
        }
        return res.status(200).json({
            success: true,
            googleMeets,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllGoogleMeets = getAllGoogleMeets;
const updateGoogleMeetStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const googleMeet = yield googleMeetService.getGoogleMeetById(id);
        if (!googleMeet) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.GOOGLE_MEET_NOT_FOUND,
            });
        }
        const updatedGoogleMeet = yield googleMeetService.updateGoogleMeetStatus(id, userStatusUpdateData);
        if (!updatedGoogleMeet) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.GOOGLE_MEET_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.GOOGLE_MEET_STATUS_UPDATED,
            googleMeet: updatedGoogleMeet,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateGoogleMeetStatus = updateGoogleMeetStatus;
