import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { RequestWithAuthData } from '../@types/express';
import { message } from '../constants/responseMessage';

config();

const verifyToken = (
  req: RequestWithAuthData,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: message.INVALID_TOKEN });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp <= currentTimestamp) {
      return res.status(401).json({ message: message.TOKEN_EXPIRED });
    }

    req.userId = decoded._id;
    req.role = decoded.role || 'user';

    next();
  } catch (err: any) {
    console.error('JWT Verification Error:', err.message);
    return res.status(400).json({ message: message.INVALID_TOKEN });
  }
};

const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  verifyToken(req as RequestWithAuthData, res, next);
};

export default verifyTokenMiddleware;
