import bcrypt from 'bcrypt';
import { customerDocument } from '@models/master-manage-modules-models/customer.models';
import * as customerAuthLoginRepository from './auth-organization-login.repository';
import logger from '@src/utils/logger';

export const customerLogin = async (
  email: string,
  password: string,
  role: string,
): Promise<customerDocument | null> => {
  const customer = await customerAuthLoginRepository.findByEmail(email);
  const customerRole = await customerAuthLoginRepository.findRole(role);
  if (
    customerRole &&
    customer &&
    (await bcrypt.compare(password, customer.password))
  ) {
    logger.info('login successfully', customer);
    return customer;
  }
  return null;
};
