import { Request, Response } from 'express';
import * as authSuperAdminLoginServices from './authSuperAdminLoginServices';
import generateToken from '../../../middleware/generateAuthToken';
import { message } from '../../../constants/responseMessage';

export const superAdminLogin = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { email, password } = req.body;

  try {
    const superAdmin = await authSuperAdminLoginServices.superAdminLogin(
      email,
      password,
    );

    if (!superAdmin) {
      return res.status(400).json({ message: message.INVALID_LOGIN });
    }

    const token = generateToken(superAdmin);
    const { password: _, ...superAdminWithoutPassword } = superAdmin.toObject();

    res.cookie('token', token).status(200).json({
      success: true,

      message: message.LOGIN_SUCCESS,
      token,
      superAdmin: superAdminWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
