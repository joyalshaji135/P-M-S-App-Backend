import { Request, Response } from 'express';
import * as customerAuthLoginServices from './auth-organization-login.services';
import generateTokenCustomer from '@middleware/generateAuthToken';
import { message } from '@constants/responseMessage';

export const customerLogin = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { email, password, role } = req.body;

  try {
    const customer = await customerAuthLoginServices.customerLogin(
      email,
      password,
      role,
    );

    if (!customer || customer.role !== role) {
      return res.status(400).json({ message: message.INVALID_LOGIN });
    }

    const token = generateTokenCustomer(customer);
    const { password: _, ...customerWithoutPassword } = customer.toObject();

    res.cookie('token', token).status(200).json({
      success: true,
      message: message.LOGIN_SUCCESS,
      token,
      customer: customerWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
