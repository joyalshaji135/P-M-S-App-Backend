import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { customerDocument } from '@models/master-manage-modules-models/customer.models';

config();

const generateToken = (customer: customerDocument): string => {
  const payload: any = {
    _id: customer._id,
    role: customer.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

export default generateToken;
