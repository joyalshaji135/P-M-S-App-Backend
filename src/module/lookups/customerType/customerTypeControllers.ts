import { Response } from "express";
import * as customerTypeService from "./customerTypeServices";
import { message } from "../../../constants/responseMessage";
import { RequestWithAuthData } from "../../../@types/express";
import { LookupTypes } from "../../../constants/lookup";
import { generateNewLookupCode } from "../../../utils/lookupCodeGenerator";


export const createCustomerTypeProfile = async (
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
    const name = req.body.name;
    const nameAlias = name.toLowerCase().replace(/\s+/g, "").replace(/\./g, "");
    const lookupType = LookupTypes.CUSTOMER_TYPE;
    const code = await generateNewLookupCode(lookupType);

    const customerTypeData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };

    const createdCustomerType =
      await customerTypeService.createCustomerTypeProfile(customerTypeData);

    return res.status(201).json({
      success: true,
      message: message.CUSTOMER_TYPE_CREATED_SUCCESS,
      customerType: createdCustomerType,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editCustomerTypeProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const customerTypeData = {
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

    if (req.body.name) {
      const name = req.body.name;
      const nameAlias = name
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/\./g, "");
      customerTypeData.nameAlias = nameAlias;
    }

    const existingCustomerType =
      await customerTypeService.getCustomerTypeById(id);
    if (!existingCustomerType) {
      return res.status(204).json({
        success: false,
        message: message.CUSTOMER_TYPE_NOT_FOUND,
      });
    }

    const updatedCustomerType =
      await customerTypeService.editCustomerTypeProfile(id, customerTypeData);

    if (!updatedCustomerType) {
      return res.status(204).json({
        success: false,
        message: message.CUSTOMER_TYPE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.CUSTOMER_TYPE_UPDATED_SUCCESS,
      customerType: updatedCustomerType,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCustomerTypeProfile = async (
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

    const deletedCustomerType = await customerTypeService.deleteCustomerType(
      id,
      req.userId,
    );

    if (!deletedCustomerType) {
      return res.status(204).json({
        success: false,
        message: message.CUSTOMER_TYPE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.CUSTOMER_TYPE_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCustomerTypeById = async (
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

    const customerType = await customerTypeService.getCustomerTypeById(id);

    if (!customerType) {
      return res.status(204).json({
        success: false,
        message: message.CUSTOMER_TYPE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      customerType,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCustomerTypes = async (
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

    const customerTypes = await customerTypeService.getAllCustomerTypes();

    if (!customerTypes) {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_CUSTOMER_TYPES,
      });
    }

    return res.status(200).json({
      success: true,
      customerTypes,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCustomerTypeStatus = async (
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
  const userStatusUpdateData = {
    ...req.body,
    userUpdatedBy: req.userId,
    userUpdatedDate: new Date(),
  };
  try {
    const updatedCustomerType =
      await customerTypeService.updateCustomerTypeStatus(
        id,
        userStatusUpdateData,
      );

    if (!updatedCustomerType) {
      return res.status(204).json({
        success: false,
        message: message.CUSTOMER_TYPE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.CUSTOMER_TYPE_STATUS_UPDATED,
      customerType: updatedCustomerType,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
