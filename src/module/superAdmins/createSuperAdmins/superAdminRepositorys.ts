import mongoose from 'mongoose';
import superAdminModel, {
  superAdminDocument,
} from '../../../model/superAdmin/superAdminModel';

export const createSuperAdminRepository = async (
  superAdminData: Partial<superAdminDocument>,
): Promise<superAdminDocument> => {
  const user = new superAdminModel(superAdminData);
  return await user.save();
};

export const findByEmail = async (
  email: string,
): Promise<superAdminDocument | null> => {
  return superAdminModel.findOne({ email }).exec();
};

export const isPhoneNumberExists = async (phone: string) => {
  return superAdminModel.findOne({ phone }).exec();
};
