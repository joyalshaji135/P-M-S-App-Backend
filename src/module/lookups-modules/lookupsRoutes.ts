import { Router } from 'express';
import customerTypeRoutes from './customer-type/customer-type.route';
import domainRoutes from './domain/domain.route';
import industryNatureRoutes from './industry-nature/industry-nature.route';
import priorityRoutes from './priority/priority.route';
import taskModuleRoutes from './task-module/task-module.route';
import roleBaseRoutes from './role-base/role-base.route';
import lookupCodeRoutes from './lookup-code/lookup-code.route';

const router: Router = Router();

router.use('/customer-type', customerTypeRoutes);
router.use('/domain', domainRoutes);
router.use('/industry-nature', industryNatureRoutes);
router.use('/priority', priorityRoutes);
router.use('/task-module', taskModuleRoutes);
router.use('/role-base', roleBaseRoutes);
router.use('/lookup-code', lookupCodeRoutes);

export default router;
