import mongoose from "mongoose";
import superAdminModel, { superAdminDocument } from "../../model/lookups/superAdminModel";
import logger from "../../utils/logger";

export const createSuperAdminRepository = async (
    superAdminData: Partial<superAdminDocument>,
  ): Promise<superAdminDocument> => {
    const saveSuperAdmin = new superAdminModel(superAdminData);
    return saveSuperAdmin.save();
  };

// Get All Super Admin Repository
export const getAllSuperAdminRepository = async (): Promise<superAdminDocument[]> => {
    return superAdminModel.find();
    // soft Delete and sort by created at date
};