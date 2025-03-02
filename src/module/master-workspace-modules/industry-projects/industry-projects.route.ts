import { Router } from 'express';
import * as industryProjectControllers from './industry-projects.controllers';

const router = Router();

router.post(
  '/create-industry-project',
  industryProjectControllers.createIndustryProject,
);

router.patch(
  '/:id/status-change-industry-project',
  industryProjectControllers.updateIndustryProjectStatus,
);

router.put(
  '/:id/update-industry-project',
  industryProjectControllers.editIndustryProject,
);

router.delete(
  '/:id/delete-industry-project',
  industryProjectControllers.deleteIndustryProject,
);

router.get(
  '/:id/get-by-id-industry-project',
  industryProjectControllers.getIndustryProjectById,
);

router.get(
  '/get-all-industry-projects',
  industryProjectControllers.getAllIndustryProjects,
);

export default router;
