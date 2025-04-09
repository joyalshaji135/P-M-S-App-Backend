import express from 'express';
import * as commonDropDownController from './common-drop-downs.controllers';

const router = express.Router();

// Get All Team Member List Functionality
router.get('/team-member-list', commonDropDownController.getAllTeamMemberList);

// Get All Team Manager List Functionality
router.get(
  '/team-manager-list',
  commonDropDownController.getAllTeamManagerList,
);

// Get All Company List Functionality
router.get('/company-list', commonDropDownController.getAllCompanyOwnerList);

// Get All Customer Type List Functionality
router.get(
  '/customer-type-list',
  commonDropDownController.getAllCustomerTypeList,
);

// Get All Domain Lists Functionality
router.get('/domain-list', commonDropDownController.getAllDomainLists);

// Get All Industry Nature Functionality
router.get(
  '/industry-nature-list',
  commonDropDownController.getAllIndustryNatures,
);

// Get All Task Module Functionality
router.get('/task-module-list', commonDropDownController.getAllTaskModules);

// Get All Priority Functionality
router.get('/priority-list', commonDropDownController.getAllPriority);

// Get All Role Functionality
router.get('/role-list', commonDropDownController.getAllRole);

// Get all Industry Project Functionality
router.get(
  '/industry-project-list',
  commonDropDownController.getAllIndustryProjects,
);

// Get all State Functionality
router.get('/dd-states', commonDropDownController.getDDAllStates);

// Get all Districts Functionality
router.get('/dd-states/:id', commonDropDownController.fetchDistricts);

export default router;
