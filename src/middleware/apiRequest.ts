// Helmet helps secure Express apps by setting various HTTP headers
import { Request, Response, NextFunction } from "express";
import { respondError } from "../helper/response";
import statusCode from "../helper/locales/statusCodes.json";
// Extend Express Request interface to include custom properties
interface CustomRequest extends Request {
  language?: string;
  appVersion?: string;
  deviceType?: string;
}

export const requireApiKey = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (req.originalUrl.startsWith("/uploads")) {
    return next();
  }

  const apiKey = req.header("x-api-key");
  const appVersion = req.header("x-app-version");
  const deviceType = req.header("x-app-deviceType");

  if (!apiKey) {
    return next(
      respondError("x-api-key is required in header", statusCode.BAD_REQUEST),
    );
  }

  if (!appVersion) {
    return next(
      respondError("x-app-version is required in header", statusCode.FORBIDDEN),
    );
  }

  if (apiKey !== process.env.API_KEY) {
    return next(respondError("invalid api-key", statusCode.FORBIDDEN));
  }

  req.appVersion = appVersion || "";
  req.deviceType = deviceType || "";

  return next();
};

export const requireAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (req.originalUrl.startsWith("/uploads")) {
    return next();
  }

  if (!req.header("Authorization")) {
    return res.status(403).json({ message: "Auth token required" });
  }

  return next();
};
