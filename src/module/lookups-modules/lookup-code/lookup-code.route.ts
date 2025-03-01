import express from 'express';
import {
  createLookupCode,
  getAllLookupCodes,
  getLookupCodeById,
  editLookupCode,
  deleteLookupCode,
  updateLookupCodeStatus,
} from './lookup-code.controllers';

const router = express.Router();

router.post('/create-lookup-code', createLookupCode);
router.get('/get-all-lookup-code', getAllLookupCodes);
router.get('/:id/get-by-id-lookup-code', getLookupCodeById);
router.put('/:id/update-lookup-code', editLookupCode);
router.delete('/:id/delete-lookup-code', deleteLookupCode);

router.patch('/:id/status-change-lookup-code', updateLookupCodeStatus);

export default router;
