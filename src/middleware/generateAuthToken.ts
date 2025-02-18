import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { superAdminDocument } from "../model/admin/superAdminModel";


config();

const generateToken = (user: superAdminDocument): string => {
  const payload: any = {
    _id: user._id,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

export default generateToken;
