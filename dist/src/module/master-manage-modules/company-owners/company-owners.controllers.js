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
exports.updateCompanyOwnerStatusController = exports.getAllCompanyOwnersController = exports.getCompanyOwnerByIdController = exports.deleteCompanyOwnerController = exports.updateCompanyOwnerController = exports.createCompanyOwnerController = void 0;
const companyOwnerServices = __importStar(require("./company-owners.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const company_owners_validation_1 = require("@validation/company-owners/company-owners.validation");
const response_1 = require("@src/helper/response");
const utils_1 = require("@src/helper/utils");
// Create Company Owner
const createCompanyOwnerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const lookupType = lookup_1.LookupTypes.COMPANY_OWNER;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const companyOwnerData = Object.assign(Object.assign({ code }, req.body), { createdBy: req.userId });
        // Add Validation for CustomerType
        const { error } = (0, company_owners_validation_1.companyOwnersValidation)(req.body);
        if (error) {
            return next((0, response_1.respondError)((0, utils_1.getMessageFromValidationError)(error)));
        }
        const phoneExists = yield companyOwnerServices.isPhoneNumberExists(companyOwnerData.phone);
        if (phoneExists) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.PHONE_NUMBER_ALREADY_EXISTS,
            });
        }
        const createdCompanyOwner = yield companyOwnerServices.createCompanyOwnerServices(companyOwnerData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.COMPANY_OWNER_CREATED_SUCCESS,
            data: createdCompanyOwner,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.createCompanyOwnerController = createCompanyOwnerController;
const updateCompanyOwnerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const companyOwnerData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        // const emailExists = await companyOwnerServices.isEmailExists(
        //   companyOwnerData.email,
        // );
        // if (emailExists) {
        //   return res.status(400).json({
        //     success: false,
        //     message: message.EMAIL_EXISTS,
        //   });
        // }
        const existingCompanyOwner = yield companyOwnerServices.getCompanyOwnerById(id);
        if (!existingCompanyOwner) {
            return res
                .status(204)
                .json({ success: false, message: responseMessage_1.message.COMPANY_OWNER_NOT_FOUND });
        }
        // if (companyOwnerData.password !== companyOwnerData.confirmPassword) {
        //   return res.status(400).json({
        //     success: false,
        //     message: message.PASSWORD_MISMATCH,
        //   });
        // }
        const updatedCompanyOwner = yield companyOwnerServices.editCompanyOwner(id, companyOwnerData);
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.COMPANY_OWNER_UPDATED_SUCCESS,
            companyOwner: updatedCompanyOwner,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateCompanyOwnerController = updateCompanyOwnerController;
const deleteCompanyOwnerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            res.status(401).json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
            return;
        }
        const deletedCompanyOwner = yield companyOwnerServices.deleteCompanyOwner(id, req.userId);
        if (!deletedCompanyOwner) {
            return res
                .status(204)
                .json({ success: false, message: responseMessage_1.message.COMPANY_OWNER_NOT_FOUND });
        }
        res
            .status(200)
            .json({ success: true, message: responseMessage_1.message.COMPANY_OWNER_DELETED });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteCompanyOwnerController = deleteCompanyOwnerController;
const getCompanyOwnerByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const companyOwner = yield companyOwnerServices.getCompanyOwnerById(id);
        if (!companyOwner) {
            return res
                .status(400)
                .json({ success: false, message: responseMessage_1.message.COMPANY_OWNER_NOT_FOUND });
        }
        if (!companyOwner) {
            return res
                .status(204)
                .json({ success: false, message: responseMessage_1.message.COMPANY_OWNER_NOT_FOUND });
        }
        res.status(200).json({ success: true, companyOwner });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getCompanyOwnerByIdController = getCompanyOwnerByIdController;
const getAllCompanyOwnersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const companyOwners = yield companyOwnerServices.getAllCompanyOwners();
        // Company Owner Not Found
        if (!companyOwners.length) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.COMPANY_OWNER_NOT_FOUND,
            });
        }
        if (companyOwners) {
            res.status(200).json({ success: true, companyOwners });
        }
        else {
            res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_COMPANY_OWNERS,
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.getAllCompanyOwnersController = getAllCompanyOwnersController;
const updateCompanyOwnerStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!req.userId) {
        return res.status(401).json({ message: responseMessage_1.message.UNAUTHORIZED });
    }
    const userModuleStatusUpdateData = Object.assign(Object.assign({}, req.body), { userUpdatedBy: req.userId, userUpdatedDate: new Date() });
    try {
        const updatedModule = yield companyOwnerServices.updateCompanyOwnerStatus(id, userModuleStatusUpdateData);
        if (!updatedModule) {
            return res
                .status(404)
                .json({ success: false, message: responseMessage_1.message.COMPANY_OWNER_NOT_FOUND });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.COMPANY_OWNER_STATUS_UPDATED,
            data: updatedModule,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateCompanyOwnerStatusController = updateCompanyOwnerStatusController;
