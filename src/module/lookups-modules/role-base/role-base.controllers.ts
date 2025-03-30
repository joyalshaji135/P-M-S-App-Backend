import { NextFunction, Response } from 'express';
import * as roleBaseService from './role-base.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { roleBaseValidation } from '@validation/role-bases/role-bases.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createRoleBaseProfile = async (
  req: RequestWithAuthData,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const name = req.body.name;
    const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
    const lookupType = LookupTypes.ROLE_BASE;
    const code = await generateNewLookupCode(lookupType);

    const roleBaseData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };
    // Add Validation for RoleBase
    // const { error } = roleBaseValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdRoleBase =
      await roleBaseService.createRoleBaseProfile(roleBaseData);

    return res.status(201).json({
      success: true,
      message: message.ROLE_BASE_CREATED_SUCCESS,
      roleBase: createdRoleBase,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editRoleBaseProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const roleBaseData = {
    ...req.body,
    userUpdatedDate: new Date(),
    userUpdatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    // Get RoleBase By Id from the database
    const roleBase = await roleBaseService.getRoleBaseById(id);

    if (!roleBase) {
      return res.status(400).json({
        success: false,
        message: message.ROLE_BASE_NOT_FOUND,
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

    const existingRoleBase = await roleBaseService.getRoleBaseById(id);
    if (!existingRoleBase) {
      return res.status(204).json({
        success: false,
        message: message.ROLE_BASE_NOT_FOUND,
      });
    }

    const updatedRoleBase = await roleBaseService.editRoleBaseProfile(
      id,
      roleBaseData,
    );

    if (!updatedRoleBase) {
      return res.status(204).json({
        success: false,
        message: message.ROLE_BASE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.ROLE_BASE_UPDATED_SUCCESS,
      roleBase: updatedRoleBase,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRoleBaseProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const deletedRoleBase = await roleBaseService.deleteRoleBase(
      id,
      req.userId,
    );

    if (!deletedRoleBase) {
      return res.status(204).json({
        success: false,
        message: message.ROLE_BASE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.ROLE_BASE_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoleBaseById = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const roleBase = await roleBaseService.getRoleBaseById(id);

    // RoleBase is not present in the database  400 "RoleBase Not Found Message"

    if (roleBase === null) {
      return res.status(400).json({
        success: false,
        message: message.ROLE_BASE_NOT_FOUND,
      });
    }

    if (!roleBase) {
      return res.status(204).json({
        success: false,
        message: message.ROLE_BASE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      roleBase,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllRoleBases = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const roleBases = await roleBaseService.getAllRoleBases();

    // RoleBase is not present in the database  400 "RoleBase Not Found Message"

    if (roleBases.length === 0) {
      return res.status(400).json({
        success: false,
        message: message.ROLE_BASE_NOT_FOUND,
      });
    }

    if (!roleBases) {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_ROLE_BASES,
      });
    }

    return res.status(200).json({
      success: true,
      roleBases,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRoleBaseStatus = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }
  console.log(req.userId);
  const userStatusUpdateData = {
    ...req.body,
    userUpdatedBy: req.userId,
    userUpdatedDate: new Date(),
  };
  try {
    // Get RoleBase By Id from the database
    const roleBase = await roleBaseService.getRoleBaseById(id);

    if (!roleBase) {
      return res.status(400).json({
        success: false,
        message: message.ROLE_BASE_NOT_FOUND,
      });
    }
    const updatedRoleBase = await roleBaseService.updateRoleBaseStatus(
      id,
      userStatusUpdateData,
    );

    if (!updatedRoleBase) {
      return res.status(204).json({
        success: false,
        message: message.ROLE_BASE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.ROLE_BASE_STATUS_UPDATED,
      roleBase: updatedRoleBase,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
