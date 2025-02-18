import { Response } from 'express';

import StatusCode from './locales/statusCodes.json';
import logger from '../utils/logger';

interface ResponseData {
  status: boolean;
  message: string;
  statusCode: number;
  data?: any;
  err?: any;
}

interface RespondOptions {
  status: boolean;
  message: string;
  statusCode: number;
  data?: any;
  err?: any;
}

const createResponse = (
  status: boolean,
  message: string,
  statusCode: number,
  data: any = null,
  err: any = null,
): ResponseData => ({
  status,
  message,
  statusCode,
  data,
  err,
});

const respond = (
  res: Response,
  { status, message, statusCode, data = null, err = null }: RespondOptions,
): Response => {
  const defaultMessage = status
    ? 'Query was successful'
    : 'Something went wrong';

  if (err) {
    console.log('error', err);
  }

  console.log(status ? 'info' : 'error', message);

  return res.status(statusCode).json({
    success: status,
    message: message || defaultMessage,
    ...(data && { data }),
  });
};

const respondSuccess = (
  res: Response,
  message: string = 'Query was successful',
  data: any = null,
): Response => {
  const statusCode = StatusCode.OK;

  console.log('info', message);

  return res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data }),
  });
};

const respondFailure = (
  res: Response,
  message: string,
  statusCode: number,
  err: any = null,
): Response =>
  respond(res, createResponse(false, message, statusCode, null, err));

const respondError = (
  message: string,
  statusCode: number = StatusCode.BAD_REQUEST,
): Error => {
  const error: Error & { status?: number } = new Error(message);
  error.status = statusCode;
  logger.error('error', message);
  return error;
};

const urlNotFound = (): Error => {
  const message = 'URL not found, please check the documentation';
  console.log('warn', message);
  const error: Error & { status?: number } = new Error(message);
  error.status = StatusCode.NOT_FOUND;
  return error;
};

export {
  createResponse,
  respond,
  respondSuccess,
  respondFailure,
  respondError,
  urlNotFound,
};
