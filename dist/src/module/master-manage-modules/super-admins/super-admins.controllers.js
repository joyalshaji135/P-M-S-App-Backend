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
exports.getAllSuperAdminsController = exports.createSuperAdminController = void 0;
const superAdminService = __importStar(require("./super-admins.services"));
const responseMessage_1 = require("@constants/responseMessage");
const mapToSuperAdminResponse = (superAdmin) => {
    return {
        name: superAdmin.name || '',
        email: superAdmin.email || '',
        id: superAdmin._id || '',
        phone: superAdmin.phone || '',
        address: {
            street: superAdmin.address.street || '',
            city: superAdmin.address.city || '',
            state: superAdmin.address.state || '',
            district: superAdmin.address.district || '',
            zipCode: superAdmin.address.zipCode || '',
        },
        role: superAdmin.role || 'superAdmin',
        status: superAdmin.status,
        isDeleted: superAdmin.isDeleted,
        userUpdatedDate: superAdmin.userUpdatedDate,
        userUpdatedBy: superAdmin.userUpdatedBy,
        deletedBy: superAdmin.deletedBy || '',
        deletedAt: superAdmin.deletedAt || '',
        isDefault: superAdmin.isDefault,
    };
};
const createSuperAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const superAdminData = req.body;
        const phoneExists = yield superAdminService.isPhoneNumberExists(superAdminData.phone);
        if (phoneExists) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.PHONE_NUMBER_ALREADY_EXISTS,
            });
        }
        if (superAdminData.password !== superAdminData.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.PASSWORD_MISMATCH,
            });
        }
        // set predefined the role for the admin
        superAdminData.role = 'admin';
        const createdSuperAdmin = yield superAdminService.createSuperAdminServices(superAdminData);
        const superAdminResponse = mapToSuperAdminResponse(createdSuperAdmin);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.SUPER_ADMIN_CREATED,
            data: superAdminResponse,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.createSuperAdminController = createSuperAdminController;
const getAllSuperAdminsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const superAdmins = yield superAdminService.getAllSuperAdminServices();
        // issue with mapToSuperAdminResponse
        const superAdminsResponses = superAdmins.map((superAdmin) => mapToSuperAdminResponse(superAdmin));
        if (superAdminsResponses.length > 0) {
            return res.status(200).json({
                success: true,
                message: responseMessage_1.message.SUPER_ADMINS_FETCHED_SUCCESSFULLY,
                data: superAdminsResponses,
            });
        }
        else {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.SUPER_ADMIN_NOT_FOUND,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllSuperAdminsController = getAllSuperAdminsController;
// export const updateSuperAdmin = async (
//   req: RequestWithAuthData,
//   res: Response
// ): Promise<any> => {
//   try {
//     if (!req.userId) {
//       return res
//         .status(401)
//         .json({ success: false, message: message.UNAUTHORIZED });
//     }
//     const { id } = req.params;
//     const updateData = {
//       ...req.body,
//       userUpdatedDate: new Date(),
//       userUpdatedBy: req.userId,
//     };
//     if (
//       updateData.password &&
//       updateData.password !== updateData.confirmPassword
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: message.PASSWORD_MISMATCH,
//       });
//     }
//     const phoneExists = await superAdminService.isPhoneNumbeExists(
//       updateData.phone
//     );
//     if (phoneExists) {
//       return res.status(400).json({
//         success: false,
//         message: message.PHONE_NUMBER_ALREADY_EXISTS,
//       });
//     }
//     const updatedSuperAdmin = await superAdminService.updateSuperAdmin(
//       id,
//       updateData
//     );
//     const updatedSuperAdminResponse = mapToSuperAdminResponse(
//       updatedSuperAdmin as superAdminDocument
//     );
//     return res.status(200).json({
//       success: true,
//       message: message.SUPER_ADMIN_UPDATED_SUCCESSFULLY,
//       data: updatedSuperAdminResponse,
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// export const getSuperAdminById = async (
//   req: RequestWithAuthData,
//   res: Response
// ): Promise<any> => {
//   const { id } = req.params;
//   try {
//     if (!req.userId) {
//       return res
//         .status(401)
//         .json({ success: false, message: message.UNAUTHORIZED });
//     }
//     const superAdmin = await superAdminService.getSuperAdminById(id);
//     if (superAdmin) {
//       const superAdminResponse = mapToSuperAdminResponse(
//         superAdmin as superAdminDocument
//       );
//       return res.status(200).json({
//         success: true,
//         message: message.SUPER_ADMINS_FETCHED_SUCCESSFULLY,
//         data: superAdminResponse,
//       });
//     } else {
//       return res.status(204).json({
//         success: false,
//         message: message.SUPER_ADMIN_NOT_FOUND,
//       });
//     }
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// export const deleteSuperAdmin = async (
//   req: RequestWithAuthData,
//   res: Response
// ): Promise<any> => {
//   const { id } = req.params;
//   try {
//     if (!req.userId) {
//       return res
//         .status(401)
//         .json({ success: false, message: message.UNAUTHORIZED });
//     }
//     const deleteResult = await superAdminService.deleteSuperAdmin(id, req.userId);
//     if (!deleteResult) {
//       return res
//         .status(204)
//         .json({ success: false, message: message.SUPER_ADMIN_NOT_FOUND });
//     }
//     return res
//       .status(200)
//       .json({ success: true, message: message.SUPER_ADMIN_DELETED });
//   } catch (error: any) {
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };
// export const updateSuperAdminStatus = async (
//   req: RequestWithAuthData,
//   res: Response
// ): Promise<any> => {
//   const { id } = req.params;
//   if (!req.userId) {
//     return res
//       .status(401)
//       .json({ success: false, message: message.UNAUTHORIZED });
//   }
//   const superAdminStatusUpdateData = {
//     ...req.body,
//     userUpdatedBy: req.userId,
//     userUpdatedDate: new Date(),
//   };
//   try {
//     const updatedSuperAdmin = await superAdminService.updateSuperAdminStatus(
//       id,
//       superAdminStatusUpdateData
//     );
//     if (!updatedSuperAdmin) {
//       return res
//         .status(404)
//         .json({ success: false, message: message.SUPER_ADMIN_NOT_FOUND });
//     }
//     const updatedSuperAdminResponse = mapToSuperAdminResponse(
//       updatedSuperAdmin as superAdminDocument
//     );
//     return res.status(200).json({
//       success: true,
//       message: message.SUPER_ADMIN_STATUS_UPDATED,
//       data: updatedSuperAdminResponse,
//     });
//   } catch (error: any) {
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };
