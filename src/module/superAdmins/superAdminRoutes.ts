import { Router } from "express";
import * as superAdminControllers from "./superAdminControllers";

const superAdminRouter = Router();

// Define routes

// Super Admin Login and Registration Module 

// Super Admin Fetch All Team Members

// Super Admin Fetch All Team Managers 

// Super Admin Fetch All Company Owners 

// Super Admin Add Team Company Owners

// Super Admin View All Projects

// Super Admin View All Tasks

// Super Admin View All WorkSpaces


superAdminRouter.get('/fetch-all-super-admin', superAdminControllers.getAllSuperAdminController);

superAdminRouter.post('/create-super-admin', superAdminControllers.createSuperAdminController);

export default superAdminRouter;