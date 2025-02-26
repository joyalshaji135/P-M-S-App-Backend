import bcrypt from 'bcrypt';
import { customerDocument } from '@models/Customers/customizeCustomerModel';
import * as companyOwnerAuthLoginRepository from './companyOwnerAuthLoginRepositorys';

export const companyOwnerLogin = async (
  email: string,
  password: string,
): Promise<customerDocument | null> => {
  const companyOwner = await companyOwnerAuthLoginRepository.findByEmail(email);
  if (companyOwner && (await bcrypt.compare(password, companyOwner.password))) {
    return companyOwner;
  }
  return null;
};
