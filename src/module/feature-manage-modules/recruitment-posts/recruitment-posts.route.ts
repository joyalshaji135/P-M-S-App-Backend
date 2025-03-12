import { Router } from 'express';
import * as recruitmentPostControllers from './recruitment-posts.controllers';

const router = Router();

router.post(
  '/create-recruitment-post',
  recruitmentPostControllers.createRecruitmentPostProfile,
);

router.patch(
  '/:id/status-change-recruitment-post',
  recruitmentPostControllers.updateRecruitmentPostStatus,
);

router.put(
  '/:id/update-recruitment-post',
  recruitmentPostControllers.editRecruitmentPostProfile,
);

router.delete(
  '/:id/delete-recruitment-post',
  recruitmentPostControllers.deleteRecruitmentPostProfile,
);

router.get(
  '/:id/get-by-id-recruitment-post',
  recruitmentPostControllers.getRecruitmentPostById,
);

router.get(
  '/get-all-recruitment-posts',
  recruitmentPostControllers.getAllRecruitmentPosts,
);

export default router;
