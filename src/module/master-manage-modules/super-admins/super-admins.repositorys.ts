import mongoose from 'mongoose';
import customerModel, {
  customerDocument,
} from '@models/master-manage-modules-models/customer.models';

export const createSuperAdminRepository = async (
  superAdminData: Partial<customerDocument>,
): Promise<customerDocument> => {
  const user = new customerModel(superAdminData);
  return await user.save();
};

export const findByEmail = async (
  email: string,
): Promise<customerDocument | null> => {
  return customerModel.findOne({ email }).exec();
};

export const isPhoneNumberExists = async (phone: string) => {
  return customerModel.findOne({ phone }).exec();
};
