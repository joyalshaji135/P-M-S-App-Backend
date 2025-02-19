import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { superAdminDocument } from '../model/superAdmin/superAdminModel';

config();

const generateToken = (superAdmin: superAdminDocument): string => {
  const payload: any = {
    _id: superAdmin._id,
    role: superAdmin.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

export default generateToken;
