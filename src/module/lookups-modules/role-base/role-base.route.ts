import { Router } from 'express';
import {
  createRoleBaseProfile,
  editRoleBaseProfile,
  deleteRoleBaseProfile,
  getRoleBaseById,
  getAllRoleBases,
  updateRoleBaseStatus,
} from './role-base.controllers'; // Updated import path

const router = Router();

// Updated route paths and function names
router.post('/create-role-base', createRoleBaseProfile);

router.patch('/:id/status-change-role-base', updateRoleBaseStatus);

router.put('/:id/update-role-base', editRoleBaseProfile);

router.delete('/:id/delete-role-base', deleteRoleBaseProfile);

router.get('/:id/get-by-id-role-base', getRoleBaseById);

router.get('/get-all-role-bases', getAllRoleBases);

export default router;
