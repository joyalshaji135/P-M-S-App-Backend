import mongoose from "mongoose";
import { superAdminDocument } from "../../model/lookups/superAdminModel";
import logger from "../../utils/logger";
import * as superAdminRepository from "./superAdminRepositorys";

export const createSuperAdminService = async (
    superAdminData: Partial<superAdminDocument>,
  ): Promise<superAdminDocument> => {
    try {
      logger.info("Creating a new super admin", { superAdminData });
  
      const newSuperAdmin = await superAdminRepository.createSuperAdminRepository(superAdminData);
  
    //   await Log.create({
    //     userId: newSuperAdmin._id,
    //     module: "superAdmin",
    //     action: "create",
    //     actionId: newSuperAdmin._id,
    //     description: `Created a new super admin: ${newSuperAdmin.email}`,
    //   });
  
      return newSuperAdmin;
    } catch (error: any) {
      throw new Error(`Error creating super admin: ${error.message}`);
    }
  };

//   Get All Super Admin
export const getAllSuperAdminService = async (): Promise<superAdminDocument[]> => {
    try {   
        logger.info("Fetching all super admins");
    
        const superAdmins = await superAdminRepository.getAllSuperAdminRepository();
    
        return superAdmins;
        } catch (error: any) {
            throw new Error(`Error fetching super admins: ${error.message}`);
        }
};