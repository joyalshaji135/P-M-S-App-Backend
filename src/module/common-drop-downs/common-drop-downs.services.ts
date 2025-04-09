import logger from '@utils/logger';
import { customerDocument } from '@src/models/master-manage-modules-models/customer.models';
import { customerTypeDocument } from '@src/models/lookups-models/customer-type.model';
import { domainDocument } from '@src/models/lookups-models/domain.model';
import { industryDocument } from '@src/models/lookups-models/industry.model';
import { roleBaseDocument } from '@src/models/lookups-models/role.model';
import { taskModuleDocument } from '@src/models/lookups-models/task-module.model';
import { priorityDocument } from '@src/models/lookups-models/priority.model';
import { industryProjectDocument } from '@src/models/master-workspace-modules-models/industry-projects.models';
const country_state_district = require('@coffeebeanslabs/country_state_district');

// Get All Team Member List Functionality
import * as commonDropDownRepository from './common-drop-downs.repositorys';
interface StateData {
  stateCode: string;
  stateName: string;
  countryCode: string;
}
export const getAllTeamMemberList = async (): Promise<customerDocument[]> => {
  try {
    const teamMemberList =
      await commonDropDownRepository.getAllTeamMemberListRepository();
    return teamMemberList;
  } catch (error) {
    throw new Error('Fail to get team member list');
  }
};

// Get All Team Manager List Functionality
export const getAllTeamManagerList = async (): Promise<customerDocument[]> => {
  try {
    const teamManagerList =
      await commonDropDownRepository.getAllTeamManagerListRepository();
    return teamManagerList;
  } catch (error) {
    throw new Error('Fail to get team manager list');
  }
};

// Get All Company Owner List Functionality
export const getAllCompanyOwnerList = async (): Promise<customerDocument[]> => {
  try {
    const companyOwnerList =
      await commonDropDownRepository.getAllCompanyOwnerListRepository();
    return companyOwnerList;
  } catch (error) {
    throw new Error('Fail to get company owner list');
  }
};

// Get All Customer Type List Functionality
export const getAllCustomerTypeList = async (): Promise<
  customerTypeDocument[]
> => {
  try {
    const customerTypeList =
      await commonDropDownRepository.getAllCustomerTypeListRepository();
    return customerTypeList;
  } catch (error) {
    throw new Error('Fail to get customer type list');
  }
};

// Get All Domain Lists Functionality
export const getAllDomainLists = async (): Promise<domainDocument[]> => {
  try {
    const domainLists =
      await commonDropDownRepository.getAllDomainListRepository();
    return domainLists;
  } catch (error) {
    throw new Error('Fail to get domain lists');
  }
};

// Get All Industry Nature Functionality
export const getAllIndustryNatures = async (): Promise<industryDocument[]> => {
  try {
    const industryNatures =
      await commonDropDownRepository.getAllIndustryNaturesRepository();
    return industryNatures;
  } catch (error) {
    throw new Error('Fail to get industry natures');
  }
};

// Get All Task Module Functionality
export const getAllTaskModules = async (): Promise<taskModuleDocument[]> => {
  try {
    const taskModules =
      await commonDropDownRepository.getAllTaskModulesRepository();
    return taskModules;
  } catch (error) {
    throw new Error('Fail to get task modules');
  }
};

// Get All Priority Functionality
export const getAllPriority = async (): Promise<priorityDocument[]> => {
  try {
    const priority = await commonDropDownRepository.getAllPriorityRepository();
    return priority;
  } catch (error) {
    throw new Error('Fail to get priority');
  }
};

// Get All Role Functionality
export const getAllRole = async (): Promise<roleBaseDocument[]> => {
  try {
    const role = await commonDropDownRepository.getAllRoleRepository();
    return role;
  } catch (error) {
    throw new Error('Fail to get role');
  }
};

// Get all Industry Project Functionality
export const getAllIndustryProjects = async (): Promise<
  industryProjectDocument[]
> => {
  try {
    const industryProjects =
      await commonDropDownRepository.getAllIndustryProjectsRepository();
    return industryProjects;
  } catch (error) {
    throw new Error('Fail to get industry projects');
  }
};

export async function fetchStates(): Promise<StateData[]> {
  try {
    const states = country_state_district.getAllStates();
    return states;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching states:', error.message);
    } else {
      console.error('Unknown error fetching states');
    }
    throw new Error('Failed to fetch states');
  }
}

export async function fetchDistrict(id: string): Promise<StateData[]> {
  try {
    const district = country_state_district.getDistrictsByStateId(id);
    return district;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching districts:', error.message);
    } else {
      console.error('Unknown error fetching districts');
    }
    throw new Error('Failed to fetch states');
  }
}
