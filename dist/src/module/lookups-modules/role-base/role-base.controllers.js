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
exports.updateRoleBaseStatus = exports.getAllRoleBases = exports.getRoleBaseById = exports.deleteRoleBaseProfile = exports.editRoleBaseProfile = exports.createRoleBaseProfile = void 0;
const roleBaseService = __importStar(require("./role-base.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createRoleBaseProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.ROLE_BASE;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const roleBaseData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // Add Validation for RoleBase
        // const { error } = roleBaseValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdRoleBase = yield roleBaseService.createRoleBaseProfile(roleBaseData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.ROLE_BASE_CREATED_SUCCESS,
            roleBase: createdRoleBase,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createRoleBaseProfile = createRoleBaseProfile;
const editRoleBaseProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const roleBaseData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get RoleBase By Id from the database
        const roleBase = yield roleBaseService.getRoleBaseById(id);
        if (!roleBase) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.ROLE_BASE_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            roleBaseData.nameAlias = nameAlias;
        }
        const existingRoleBase = yield roleBaseService.getRoleBaseById(id);
        if (!existingRoleBase) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.ROLE_BASE_NOT_FOUND,
            });
        }
        const updatedRoleBase = yield roleBaseService.editRoleBaseProfile(id, roleBaseData);
        if (!updatedRoleBase) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.ROLE_BASE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.ROLE_BASE_UPDATED_SUCCESS,
            roleBase: updatedRoleBase,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editRoleBaseProfile = editRoleBaseProfile;
const deleteRoleBaseProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedRoleBase = yield roleBaseService.deleteRoleBase(id, req.userId);
        if (!deletedRoleBase) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.ROLE_BASE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.ROLE_BASE_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteRoleBaseProfile = deleteRoleBaseProfile;
const getRoleBaseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const roleBase = yield roleBaseService.getRoleBaseById(id);
        // RoleBase is not present in the database  400 "RoleBase Not Found Message"
        if (roleBase === null) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.ROLE_BASE_NOT_FOUND,
            });
        }
        if (!roleBase) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.ROLE_BASE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            roleBase,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getRoleBaseById = getRoleBaseById;
const getAllRoleBases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const roleBases = yield roleBaseService.getAllRoleBases();
        // RoleBase is not present in the database  400 "RoleBase Not Found Message"
        if (roleBases.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.ROLE_BASE_NOT_FOUND,
            });
        }
        if (!roleBases) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_ROLE_BASES,
            });
        }
        return res.status(200).json({
            success: true,
            roleBases,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllRoleBases = getAllRoleBases;
const updateRoleBaseStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Get RoleBase By Id from the database
        const roleBase = yield roleBaseService.getRoleBaseById(id);
        if (!roleBase) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.ROLE_BASE_NOT_FOUND,
            });
        }
        const updatedRoleBase = yield roleBaseService.updateRoleBaseStatus(id, userStatusUpdateData);
        if (!updatedRoleBase) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.ROLE_BASE_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.ROLE_BASE_STATUS_UPDATED,
            roleBase: updatedRoleBase,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateRoleBaseStatus = updateRoleBaseStatus;
