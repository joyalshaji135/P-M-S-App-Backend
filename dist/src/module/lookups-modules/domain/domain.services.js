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
exports.updateDomainStatus = exports.deleteDomain = exports.getDomainById = exports.getAllDomains = exports.editDomainProfile = exports.createDomainProfile = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const domainRepository = __importStar(require("./domain.repository"));
const createDomainProfile = (domainData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new domain profile', { domainData });
        if (!domainData.name) {
            throw new Error('Domain name is required.');
        }
        if (!domainData.nameAlias) {
            throw new Error('Domain name alias is required.');
        }
        const existingDomainByName = yield domainRepository.isNameExists(domainData.name);
        const existingDomainByAlias = yield domainRepository.isNameAliasExists(domainData.nameAlias);
        if (existingDomainByName) {
            throw new Error('A domain with the same name already exists.');
        }
        if (existingDomainByAlias) {
            throw new Error('A domain with the same name alias already exists.');
        }
        const newDomainProfile = yield domainRepository.create(domainData);
        yield log_model_1.default.create({
            userId: newDomainProfile.createdBy,
            module: 'domain',
            action: 'create',
            actionId: newDomainProfile._id,
            description: `Created a new domain profile with name: ${newDomainProfile.name}`,
        });
        return newDomainProfile;
    }
    catch (error) {
        throw new Error(`Error creating domain profile: ${error.message}`);
    }
});
exports.createDomainProfile = createDomainProfile;
const editDomainProfile = (domainId, domainData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing domain profile with ID ${domainId}`, {
            domainData,
        });
        if (domainData.name) {
            const existingDomain = yield domainRepository.isNameExists(domainData.name, domainId);
            if (existingDomain) {
                throw new Error('A domain with the same name already exists.');
            }
        }
        if (domainData.nameAlias) {
            const existingDomain = yield domainRepository.isNameAliasExists(domainData.nameAlias, domainId);
            if (existingDomain) {
                throw new Error('A domain with the same name alias already exists.');
            }
        }
        const updatedDomainProfile = yield domainRepository.updateById(domainId, domainData);
        if (!updatedDomainProfile) {
            throw new Error(`Domain profile with ID ${domainId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedDomainProfile.userUpdatedBy,
            module: 'domain',
            action: 'edit',
            actionId: updatedDomainProfile._id,
            description: `Updated domain profile with ID ${domainId}`,
        });
        return updatedDomainProfile;
    }
    catch (error) {
        throw new Error(`Error updating domain profile: ${error.message}`);
    }
});
exports.editDomainProfile = editDomainProfile;
const getAllDomains = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all domains');
    return domainRepository.getAllDomains();
});
exports.getAllDomains = getAllDomains;
const getDomainById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting domain with ID ${id}`);
    return domainRepository.findById(id);
});
exports.getDomainById = getDomainById;
const deleteDomain = (domainId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting domain with ID ${domainId} by user ${deletedBy}`);
        const deletedDomain = yield domainRepository.deleteDomain(domainId, deletedBy);
        if (!deletedDomain) {
            throw new Error(`Domain profile with ID ${domainId} not found`);
        }
        return deletedDomain;
    }
    catch (error) {
        throw new Error(`Error deleting domain profile: ${error.message}`);
    }
});
exports.deleteDomain = deleteDomain;
const updateDomainStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for domain with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield domainRepository.changeDomainStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Domain profile with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'domain',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for domain profile with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating domain profile status: ${error.message}`);
    }
});
exports.updateDomainStatus = updateDomainStatus;
