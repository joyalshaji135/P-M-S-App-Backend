import express from 'express';

import * as companyOwnerControllers from './company-owners.controllers';

const router = express.Router();

// Create Company Owner Routes
router.post(
  '/create-company-owner',
  companyOwnerControllers.createCompanyOwnerController,
);

// Get All Company Owner Routes
router.get(
  '/get-all-company-owner',
  companyOwnerControllers.getAllCompanyOwnersController,
);

// Get Company Owner By Id Routes
router.get(
  '/:id/get-by-id-company-owner',
  companyOwnerControllers.getCompanyOwnerByIdController,
);

// Update Company Owner Routes
router.put(
  '/:id/update-company-owner',
  companyOwnerControllers.updateCompanyOwnerController,
);

// Delete Company Owner Routes
router.delete(
  '/:id/delete-company-owner',
  companyOwnerControllers.deleteCompanyOwnerController,
);

// Update Company Owner Status Routes
router.patch(
  '/:id/status-change-company-owner',
  companyOwnerControllers.updateCompanyOwnerStatusController,
);

export default router;
