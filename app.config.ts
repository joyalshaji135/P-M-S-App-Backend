import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
// import morgan from "morgan";
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
// import hpp from "hpp";
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import multer from 'multer';
import routes from './src/routes';
import { respond } from './src/helper/response';
import i18n from './src/config/i18n.config';
import path from 'path';

const client_api = process.env.CLIENT_API || 'http://localhost:5173';
const corsOptions: cors.CorsOptions = {
  origin: client_api, // Allow the client origin
  credentials: true,
  exposedHeaders: 'Content-Type, X-Auth-Token, x-app-version, x-api-key',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 1800, // Maximum of 1800 requests in 15 minutes
  standardHeaders: true, // Include `RateLimit-*` headers in response
  legacyHeaders: false, // Disable `X-RateLimit-*` headers (older version)
});

const expressApp = express();
expressApp.use(helmet());
expressApp.use(helmet.hidePoweredBy());
expressApp.use(mongoSanitize());

expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());
expressApp.use(limiter);
expressApp.use(cors(corsOptions));

// Handle preflight requests (OPTIONS)
expressApp.options('*', cors(corsOptions));
expressApp.use(i18n.init);
const upload = multer({
  limits: {
    fileSize: Number(process.env.MAXFILESIZE),
  },
});
expressApp.use(
  '/uploads',
  express.static(path.join(__dirname, 'public/uploads')),
);

// Define API route with error handling middleware
expressApp.use(
  '/api',
  // upload.any(),

  routes,
  (err: any, req: Request, res: Response, next: NextFunction): any => {
    console.log(err, 'error');
    const status = err.status || 400;
    return res.status(status).json({
      success: false,
      message: err.message,
    });
  },
);

expressApp.use((err: any, _req: any, res: any, next: any) => {
  if (res.headersSent) {
    return next(err);
  }
  const error = err;
  const status = err.statusCode || err.status || 500;
  console.error(err);
  if (error.message) {
    return respond(res, {
      status: false,
      message: error.message
        ? error.message.replace('Error: ', '')
        : err.statusMessage,
      statusCode: status,
    });
  }
  return next();
});
export default expressApp;
