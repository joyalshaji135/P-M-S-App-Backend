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
exports.updateCustomerTypeStatus = exports.deleteCustomerType = exports.getCustomerTypeById = exports.getAllCustomerTypes = exports.editCustomerTypeProfile = exports.createCustomerTypeProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const customerTypeRepository = __importStar(require("./customer-type.repositorys"));
const createCustomerTypeProfile = (customerTypeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new customer type profile', { customerTypeData });
        if (!customerTypeData.name) {
            throw new Error('Customer type name is required.');
        }
        if (!customerTypeData.nameAlias) {
            throw new Error('Customer type name alias is required.');
        }
        const existingCustomerTypeByName = yield customerTypeRepository.isNameExists(customerTypeData.name);
        const existingCustomerTypeByAlias = yield customerTypeRepository.isNameAliasExists(customerTypeData.nameAlias);
        if (existingCustomerTypeByName) {
            throw new Error('A customer type with the same name already exists.');
        }
        if (existingCustomerTypeByAlias) {
            throw new Error('A customer type with the same name alias already exists.');
        }
        const newCustomerTypeProfile = yield customerTypeRepository.create(customerTypeData);
        yield log_model_1.default.create({
            userId: newCustomerTypeProfile.createdBy,
            module: 'customerType',
            action: 'create',
            actionId: newCustomerTypeProfile._id,
            description: `Created a new customer type profile with name: ${newCustomerTypeProfile.name}`,
        });
        return newCustomerTypeProfile;
    }
    catch (error) {
        throw new Error(`Error creating customer type profile: ${error.message}`);
    }
});
exports.createCustomerTypeProfile = createCustomerTypeProfile;
const editCustomerTypeProfile = (customerTypeId, customerTypeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing customer type profile with ID ${customerTypeId}`, {
            customerTypeData,
        });
        if (customerTypeData.name) {
            const existingCustomerType = yield customerTypeRepository.isNameExists(customerTypeData.name, customerTypeId);
            if (existingCustomerType) {
                throw new Error('A customer type with the same name already exists.');
            }
        }
        if (customerTypeData.nameAlias) {
            const existingCustomerType = yield customerTypeRepository.isNameAliasExists(customerTypeData.nameAlias, customerTypeId);
            if (existingCustomerType) {
                throw new Error('A customer type with the same name alias already exists.');
            }
        }
        const updatedCustomerTypeProfile = yield customerTypeRepository.updateById(customerTypeId, customerTypeData);
        if (!updatedCustomerTypeProfile) {
            throw new Error(`Customer type profile with ID ${customerTypeId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedCustomerTypeProfile.userUpdatedBy,
            module: 'customerType',
            action: 'edit',
            actionId: updatedCustomerTypeProfile._id,
            description: `Updated customer type profile with ID ${customerTypeId}`,
        });
        return updatedCustomerTypeProfile;
    }
    catch (error) {
        throw new Error(`Error updating customer type profile: ${error.message}`);
    }
});
exports.editCustomerTypeProfile = editCustomerTypeProfile;
const getAllCustomerTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all customer types');
    return customerTypeRepository.getAllCustomerTypes();
});
exports.getAllCustomerTypes = getAllCustomerTypes;
const getCustomerTypeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting customer type with ID ${id}`);
    return customerTypeRepository.findById(id);
});
exports.getCustomerTypeById = getCustomerTypeById;
const deleteCustomerType = (customerTypeId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting customer type with ID ${customerTypeId} by user ${deletedBy}`);
        const deletedCustomerType = yield customerTypeRepository.deleteCustomerType(customerTypeId, deletedBy);
        if (!deletedCustomerType) {
            throw new Error(`Customer type profile with ID ${customerTypeId} not found`);
        }
        return deletedCustomerType;
    }
    catch (error) {
        throw new Error(`Error deleting customer type profile: ${error.message}`);
    }
});
exports.deleteCustomerType = deleteCustomerType;
const updateCustomerTypeStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for customer type with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield customerTypeRepository.changeCustomerTypeStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Customer type profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'customerType',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for customer type profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating customer type profile status: ${error.message}`);
    }
});
exports.updateCustomerTypeStatus = updateCustomerTypeStatus;
