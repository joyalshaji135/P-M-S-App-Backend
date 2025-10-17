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
exports.updateCustomerTypeStatus = exports.getAllCustomerTypes = exports.getCustomerTypeById = exports.deleteCustomerTypeProfile = exports.editCustomerTypeProfile = exports.createCustomerTypeProfile = void 0;
const customerTypeService = __importStar(require("./customer-type.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const customer_types_validation_1 = require("@validation/customer-types/customer-types.validation");
const response_1 = require("@helper/response");
const utils_1 = require("@helper/utils");
const createCustomerTypeProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.CUSTOMER_TYPE;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const customerTypeData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // Add Validation for CustomerType
        const { error } = (0, customer_types_validation_1.customerTypeValidation)(req.body);
        if (error) {
            return next((0, response_1.respondError)((0, utils_1.getMessageFromValidationError)(error)));
        }
        const createdCustomerType = yield customerTypeService.createCustomerTypeProfile(customerTypeData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.CUSTOMER_TYPE_CREATED_SUCCESS,
            customerType: createdCustomerType,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createCustomerTypeProfile = createCustomerTypeProfile;
const editCustomerTypeProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const customerTypeData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get CustomerType By Id from the database
        const customerType = yield customerTypeService.getCustomerTypeById(id);
        if (!customerType) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.CUSTOMER_TYPE_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            customerTypeData.nameAlias = nameAlias;
        }
        const existingCustomerType = yield customerTypeService.getCustomerTypeById(id);
        if (!existingCustomerType) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.CUSTOMER_TYPE_NOT_FOUND,
            });
        }
        const updatedCustomerType = yield customerTypeService.editCustomerTypeProfile(id, customerTypeData);
        if (!updatedCustomerType) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.CUSTOMER_TYPE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.CUSTOMER_TYPE_UPDATED_SUCCESS,
            customerType: updatedCustomerType,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editCustomerTypeProfile = editCustomerTypeProfile;
const deleteCustomerTypeProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedCustomerType = yield customerTypeService.deleteCustomerType(id, req.userId);
        if (!deletedCustomerType) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.CUSTOMER_TYPE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.CUSTOMER_TYPE_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteCustomerTypeProfile = deleteCustomerTypeProfile;
const getCustomerTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const customerType = yield customerTypeService.getCustomerTypeById(id);
        // Customer is not present in the database  400 "Customer Not Found Message"
        if (customerType === null) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.CUSTOMER_TYPE_NOT_FOUND,
            });
        }
        if (!customerType) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.CUSTOMER_TYPE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            customerType,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getCustomerTypeById = getCustomerTypeById;
const getAllCustomerTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const customerTypes = yield customerTypeService.getAllCustomerTypes();
        // Customer is not present in the database  400 "Customer Not Found Message"
        if (customerTypes.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.CUSTOMER_TYPE_NOT_FOUND,
            });
        }
        if (!customerTypes) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_CUSTOMER_TYPES,
            });
        }
        return res.status(200).json({
            success: true,
            customerTypes,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllCustomerTypes = getAllCustomerTypes;
const updateCustomerTypeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Get CustomerType By Id from the database
        const customerType = yield customerTypeService.getCustomerTypeById(id);
        if (!customerType) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.CUSTOMER_TYPE_NOT_FOUND,
            });
        }
        const updatedCustomerType = yield customerTypeService.updateCustomerTypeStatus(id, userStatusUpdateData);
        if (!updatedCustomerType) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.CUSTOMER_TYPE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.CUSTOMER_TYPE_STATUS_UPDATED,
            customerType: updatedCustomerType,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateCustomerTypeStatus = updateCustomerTypeStatus;
