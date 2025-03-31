// Count Functionality
import express from 'express';
import * as commonCountApiControllers from './common-count-api.controllers';

const router = express.Router();

// Company Owner Count Functions
router.get(
  '/company-owner-count',
  commonCountApiControllers.getAllCompanyOwnerCount,
);

// Team Manager Count Functions
router.get(
  '/team-manager-count',
  commonCountApiControllers.getAllTeamManagerCount,
);

// Team Member Count Functions
router.get(
  '/team-member-count',
  commonCountApiControllers.getAllTeamMemberCount,
);

// Event Count Functions
router.get('/event-count', commonCountApiControllers.getAllEventCount);

// Google Meet Count Functions
router.get(
  '/google-meet-count',
  commonCountApiControllers.getAllGoogleMeetCount,
);

// Recruitment Count Functions
router.get(
  '/recruitment-count',
  commonCountApiControllers.getAllRecruitmentCount,
);

// File Document Count Functions
router.get(
  '/file-document-count',
  commonCountApiControllers.getAllDocumentFileCount,
);

export default router;
