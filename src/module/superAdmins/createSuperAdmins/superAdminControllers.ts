import { superAdminDocument } from '@models/superAdmin/superAdminModel';
import { RequestWithAuthData } from '../../../@types/express';
import * as superAdminService from './superAdminServices';
import { NextFunction, Response } from 'express';
import { message } from '../../../constants/responseMessage';

const mapToSuperAdminResponse = (superAdmin: superAdminDocument) => {
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

export const createSuperAdminController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    const superAdminData = req.body;

    const phoneExists = await superAdminService.isPhoneNumbeExists(
      superAdminData.phone,
    );
    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: message.PHONE_NUMBER_ALREADY_EXISTS,
      });
    }

    if (superAdminData.password !== superAdminData.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: message.PASSWORD_MISMATCH,
      });
    }

    const createdSuperAdmin =
      await superAdminService.createSuperAdminServices(superAdminData);

    const superAdminResponse = mapToSuperAdminResponse(
      createdSuperAdmin as superAdminDocument,
    );

    return res.status(201).json({
      success: true,
      message: message.SUPER_ADMIN_CREATED,
      data: superAdminResponse,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

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

// export const getAllSuperAdmins = async (
//   req: RequestWithAuthData,
//   res: Response
// ): Promise<any> => {
//   try {
//     if (!req.userId) {
//       return res
//         .status(401)
//         .json({ success: false, message: message.UNAUTHORIZED });
//     }

//     const superAdmins = await superAdminService.getAllSuperAdmins();

//     // issue with mapToSuperAdminResponse
//     const superAdminsResponses = superAdmins.map((superAdmin: any) =>
//       mapToSuperAdminResponse(superAdmin as superAdminDocument)
//     );

//     if (superAdminsResponses.length > 0) {
//       return res.status(200).json({
//         success: true,
//         message: message.SUPER_ADMINS_FETCHED_SUCCESSFULLY,
//         data: superAdminsResponses,
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
