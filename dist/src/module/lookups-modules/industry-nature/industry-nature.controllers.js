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
exports.updateIndustryNatureStatus = exports.getAllIndustryNatures = exports.getIndustryNatureById = exports.deleteIndustryNatureProfile = exports.editIndustryNatureProfile = exports.createIndustryNatureProfile = void 0;
const industryNatureService = __importStar(require("./industry-nature.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createIndustryNatureProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.INDUSTRY_NATURE;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const industryNatureData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // Add Validation for IndustryNature
        // const { error } = industryNatureValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdIndustryNature = yield industryNatureService.createIndustryNatureProfile(industryNatureData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.INDUSTRY_NATURE_CREATES_SUCCESS,
            industryNature: createdIndustryNature,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createIndustryNatureProfile = createIndustryNatureProfile;
const editIndustryNatureProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const industryNatureData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get IndustryNature By Id from the database
        const industryNature = yield industryNatureService.getIndustryNatureById(id);
        if (!industryNature) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_NATURE_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            industryNatureData.nameAlias = nameAlias;
        }
        const existingIndustryNature = yield industryNatureService.getIndustryNatureById(id);
        if (!existingIndustryNature) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_NATURE_NOT_FOUND,
            });
        }
        const updatedIndustryNature = yield industryNatureService.editIndustryNatureProfile(id, industryNatureData);
        if (!updatedIndustryNature) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_NATURE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.INDUSTRY_NATURE_UPDATED_SUCCESS,
            industryNature: updatedIndustryNature,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editIndustryNatureProfile = editIndustryNatureProfile;
const deleteIndustryNatureProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedIndustryNature = yield industryNatureService.deleteIndustryNature(id, req.userId);
        if (!deletedIndustryNature) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_NATURE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.INDUSTRY_NATURE_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteIndustryNatureProfile = deleteIndustryNatureProfile;
const getIndustryNatureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const industryNature = yield industryNatureService.getIndustryNatureById(id);
        // IndustryNature is not present in the database  400 "IndustryNature Not Found Message"
        if (industryNature === null) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_NATURE_NOT_FOUND,
            });
        }
        if (!industryNature) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_NATURE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            industryNature,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getIndustryNatureById = getIndustryNatureById;
const getAllIndustryNatures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const industryNatures = yield industryNatureService.getAllIndustryNatures();
        // IndustryNature is not present in the database  400 "IndustryNature Not Found Message"
        if (industryNatures.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_NATURE_NOT_FOUND,
            });
        }
        if (!industryNatures) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_INDUSTRY_PROJECTS,
            });
        }
        return res.status(200).json({
            success: true,
            industryNatures,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllIndustryNatures = getAllIndustryNatures;
const updateIndustryNatureStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Get IndustryNature By Id from the database
        const industryNature = yield industryNatureService.getIndustryNatureById(id);
        if (!industryNature) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_NATURE_NOT_FOUND,
            });
        }
        const updatedIndustryNature = yield industryNatureService.updateIndustryNatureStatus(id, userStatusUpdateData);
        if (!updatedIndustryNature) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.INDUSTRY_NATURE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.INDUSTRY_NATURE_STATUS_UPDATED,
            industryNature: updatedIndustryNature,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateIndustryNatureStatus = updateIndustryNatureStatus;
