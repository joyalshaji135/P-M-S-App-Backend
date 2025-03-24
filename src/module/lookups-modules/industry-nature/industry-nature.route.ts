import { Router } from 'express';
import {
  createIndustryNatureProfile,
  editIndustryNatureProfile,
  deleteIndustryNatureProfile,
  getIndustryNatureById,
  getAllIndustryNatures,
  updateIndustryNatureStatus,
} from './industry-nature.controllers'; // Updated import path

const router = Router();

// Updated route paths and function names
router.post('/create-industry-nature', createIndustryNatureProfile);

router.patch('/:id/status-change-industry-nature', updateIndustryNatureStatus);

router.put('/:id/update-industry-nature', editIndustryNatureProfile);

router.delete('/:id/delete-industry-nature', deleteIndustryNatureProfile);

router.get('/:id/get-by-id-industry-nature', getIndustryNatureById);

router.get('/get-all-industry-natures', getAllIndustryNatures);

export default router;