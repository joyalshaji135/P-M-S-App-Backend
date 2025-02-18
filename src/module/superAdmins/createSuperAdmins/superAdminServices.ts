import mongoose from 'mongoose';
import { superAdminDocument } from '../../../model/admin/superAdminModel';
import logger from '../../../utils/logger';
import * as superAdminRepository from './superAdminRepositorys';
import { message } from '../../../constants/responseMessage';
import bcrypt from 'bcrypt';

export const createSuperAdminServices = async (
  superAdminData: Partial<superAdminDocument>,
): Promise<Partial<superAdminDocument>> => {
  logger.info(`Creating super admin: ${superAdminData.email}`);

  const { password, email, ...otherSuperAdminData } = superAdminData;

  if (!password) {
    throw new Error(message.PASSWORD_REQUIRED);
  }
  if (!email) {
    throw new Error(message.EMAIL_REQUIRED);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newSuperAdmin: Partial<superAdminDocument> = {
    ...otherSuperAdminData,
    password: hashedPassword,
    email,
  };

  const existingSuperAdmin = await superAdminRepository.findByEmail(email);
  if (existingSuperAdmin) {
    throw new Error(message.SUPER_ADMIN_EXISTS);
  }

  const createdSuperAdmin =
    await superAdminRepository.createSuperAdminRepository(newSuperAdmin);

  return createdSuperAdmin;
};

export const isPhoneNumbeExists = async (phone: string) => {
  return await superAdminRepository.isPhoneNumberExists(phone);
};
