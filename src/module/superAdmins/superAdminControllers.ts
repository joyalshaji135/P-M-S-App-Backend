import { Request, Response } from 'express';
import * as superAdminServices from './superAdminServices';
import { message } from '../../constants/responseMessage';

export const createSuperAdminController = async (
    req: Request, 
    res: Response
): Promise<any> => {
  try {
    const superAdmin = {
        ...req.body
    }

    // Validation Completed and pass to createSuperAdminService
    const createSuperAdmin = await superAdminServices.createSuperAdminService(superAdmin);

    return res.status(201).json({
        success: true,
        message: message.SUPER_ADMIN_CREATED,
        superAdmin: createSuperAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create super admin', error });
  }
};

export const getAllSuperAdminController = async (
    req: Request,
    res: Response
): Promise<any> => {
    try{
        const superAdmins = await superAdminServices.getAllSuperAdminService();

        return res.status(200).json({
            success: true,
            message: message.SUPER_ADMIN_FETCHED,
            superAdmin: superAdmins,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch super admin', error });
    }   
};