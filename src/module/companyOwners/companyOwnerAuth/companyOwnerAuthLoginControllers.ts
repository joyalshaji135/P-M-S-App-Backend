import { Request, Response } from 'express';
import * as companyOwnerAuthLoginServices from './companyOwnerAuthLoginServices';
import generateTokenCustomer from '../../../middleware/generateAuthCustomer';
import { message } from '../../../constants/responseMessage';

export const companyOwnerLogin = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { email, password } = req.body;

  try {
    const companyOwner = await companyOwnerAuthLoginServices.companyOwnerLogin(
      email,
      password,
    );

    if (!companyOwner) {
      return res.status(400).json({ message: message.INVALID_LOGIN });
    }

    const token = generateTokenCustomer(companyOwner);
    const { password: _, ...companyOwnerWithoutPassword } = companyOwner.toObject();

    res.cookie('token', token).status(200).json({
      success: true,
      message: message.LOGIN_SUCCESS,
      token,
      companyOwner: companyOwnerWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
