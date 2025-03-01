import mongoose from 'mongoose';
import { customerDocument } from '@models/master-manage-modules-models/customer.models';
import logger from '@utils/logger';
import * as companyOwnerRepository from './company-owners.repositorys';
import { message } from '@constants/responseMessage';
import bcrypt from 'bcrypt';
import Log from '@models/lookups-models/log.model';

export const createCompanyOwnerServices = async (
  companyOwnerData: Partial<customerDocument>,
): Promise<Partial<customerDocument>> => {
  logger.info(`Creating company owner: ${companyOwnerData.email}`);

  const { password, email, ...otherCompanyOwnerData } = companyOwnerData;

  if (!password) {
    throw new Error(message.PASSWORD_REQUIRED);
  }
  if (!email) {
    throw new Error(message.EMAIL_REQUIRED);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newCompanyOwner: Partial<customerDocument> = {
    ...otherCompanyOwnerData,
    password: hashedPassword,
    email,
  };

  const existingCompanyOwner = await companyOwnerRepository.findByEmail(email);
  if (existingCompanyOwner) {
    throw new Error(message.COMPANY_OWNER_EXISTS);
  }

  const createdCompanyOwner =
    await companyOwnerRepository.createCompanyOwnerRepository(newCompanyOwner);
  await Log.create({
    userId: createdCompanyOwner.createdBy,
    module: 'companyOwner',
    action: 'create',
    actionId: createdCompanyOwner._id,
    description: `Created a new customer type profile with name: ${createdCompanyOwner.name}`,
  });
  return createdCompanyOwner;
};

export const isPhoneNumberExists = async (phone: string) => {
  return await companyOwnerRepository.isPhoneNumberExists(phone);
};
