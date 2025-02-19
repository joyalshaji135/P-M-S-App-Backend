import express from 'express';

import * as companyOwnerControllers from './companyOwnerControllers';

const router = express.Router();

router.post(
  '/create-company-owner',
  companyOwnerControllers.createCompanyOwnerController,
);

export default router;