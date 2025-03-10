import { Router } from 'express';
import * as eventProgramsControllers from './event-programs.controllers';

const router = Router();

router.post('/create-event-programs', eventProgramsControllers.createEventProgramsProfile);

router.patch('/:id/status-change-event-programs', eventProgramsControllers.updateEventProgramsStatus);

router.put('/:id/update-event-programs', eventProgramsControllers.editEventProgramsProfile);

router.delete('/:id/delete-event-programs', eventProgramsControllers.deleteEventProgramsProfile);

router.get('/:id/get-by-id-event-programs', eventProgramsControllers.getEventProgramsById);

router.get('/get-all-event-programs', eventProgramsControllers.getAllEventPrograms);

export default router;
