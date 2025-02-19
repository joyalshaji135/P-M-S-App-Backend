import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { customerDocument } from '../model/Customers/customizeCustomerModel';

config();

const generateTokenCustomer = (customer: customerDocument): string => {
  const payload: any = {
    _id: customer._id,
    role: customer.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

export default generateTokenCustomer;
