import { Router } from 'express';
import * as documentFileControllers from './document-files.controllers';

const router = Router();

router.post('/create-document-files', documentFileControllers.createDocumentFileProfile);

router.patch('/:id/status-change-document-files', documentFileControllers.updateDocumentFileStatus);

router.put('/:id/update-document-files', documentFileControllers.editDocumentFileProfile);

router.delete('/:id/delete-document-files', documentFileControllers.deleteDocumentFileProfile);

router.get('/:id/get-by-id-document-files', documentFileControllers.getDocumentFileById);

router.get('/get-all-document-files', documentFileControllers.getAllDocumentFiles);

export default router;
