import { Router } from 'express';
import {
  createDomainProfile,
  editDomainProfile,
  deleteDomainProfile,
  getDomainById,
  getAllDomains,
  updateDomainStatus,
} from './domain.controllers'; // Updated import path

const router = Router();

// Updated route paths and function names
router.post('/create-domain', createDomainProfile);

router.patch('/:id/status-change-domain', updateDomainStatus);

router.put('/:id/update-domain', editDomainProfile);

router.delete('/:id/delete-domain', deleteDomainProfile);

router.get('/:id/get-by-id-domain', getDomainById);

router.get('/get-all-domain', getAllDomains);

export default router;
