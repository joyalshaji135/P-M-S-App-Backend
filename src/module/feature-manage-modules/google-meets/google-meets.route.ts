import { Router } from 'express';
import * as googleMeetControllers from './google-meets.controllers';

const router = Router();

router.post(
  '/create-google-meet',
  googleMeetControllers.createGoogleMeetProfile,
);

router.patch(
  '/:id/status-change-google-meet',
  googleMeetControllers.updateGoogleMeetStatus,
);

router.put(
  '/:id/update-google-meet',
  googleMeetControllers.editGoogleMeetProfile,
);

router.delete(
  '/:id/delete-google-meet',
  googleMeetControllers.deleteGoogleMeetProfile,
);

router.get(
  '/:id/get-by-id-google-meet',
  googleMeetControllers.getGoogleMeetById,
);

router.get('/get-all-google-meets', googleMeetControllers.getAllGoogleMeets);

export default router;
