// Import modules
import express from 'express';

// Import controllers
import { customerLogin } from './auth-organization-login.controllers';

// Define routes
const router = express.Router();

router.post('/login', customerLogin);

export default router;
