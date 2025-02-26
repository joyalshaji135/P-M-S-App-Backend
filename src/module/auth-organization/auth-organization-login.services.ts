import bcrypt from 'bcrypt';
import { superAdminDocument } from '@models/superAdmin/superAdminModel';
import * as authSuperAdminLoginRepository from './auth-organization-login.repository';

export const superAdminLogin = async (
  email: string,
  password: string,
): Promise<superAdminDocument | null> => {
  const superAdmin = await authSuperAdminLoginRepository.findByEmail(email);
  if (superAdmin && (await bcrypt.compare(password, superAdmin.password))) {
    return superAdmin;
  }
  return null;
};
