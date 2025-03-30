import customerTypeModel, { customerTypeDocument } from '@src/models/lookups-models/customer-type.model';
import domainModel, { domainDocument } from '@src/models/lookups-models/domain.model';
import industryModel, { industryDocument } from '@src/models/lookups-models/industry.model';
import roleModel, { roleBaseDocument } from '@src/models/lookups-models/role.model';
import taskModuleModel, { taskModuleDocument } from '@src/models/lookups-models/task-module.model';
import priorityModel, { priorityDocument } from '@src/models/lookups-models/priority.model';
import industryProjectsModels, { industryProjectDocument } from '@src/models/master-workspace-modules-models/industry-projects.models';
import customerModels, {
  customerDocument,
} from '@src/models/master-manage-modules-models/customer.models';

// Team Member Get Functionality in Repository
export const getAllTeamMemberListRepository = async (): Promise<
  customerDocument[]
> => {
  return customerModels
    .find({ isDeleted: false, role: 'team-members' }) // Make sure 'team-members' matches your system role
    .select("name email phone role")
    .sort({ createdAt: -1 });
};

// Team Manager Get Functionality in Repository
export const getAllTeamManagerListRepository = async (): Promise<
  customerDocument[]
> => {
  return customerModels
    .find({ isDeleted: false, role: 'team-managers' }) // Make sure 'team-managers' matches your system role
    .select("name email phone role")
    .sort({ createdAt: -1 });
};

// Company Owner Get Functionality in Repository
export const getAllCompanyOwnerListRepository = async (): Promise<
  customerDocument[]
> => {
  return customerModels
    .find({ isDeleted: false, role: 'company-owners' }) // Make sure 'company-owners' matches your system role
    .select("name email phone role")
    .sort({ createdAt: -1 });
};

// Get All  CustomerType List Functionality in Repository
export const getAllCustomerTypeListRepository = async (): Promise<
  customerTypeDocument[]
> => {
  return customerTypeModel
    .find({ isDeleted: false }) 
    .select("name")
    .sort({ createdAt: -1 });
};

// Get All Domain Lists Functionality in Repository
export const getAllDomainListRepository = async (): Promise<domainDocument[]> => {
  return domainModel
    .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
    .select("name")
    .sort({ createdAt: -1 });

};

// Get All Industry Nature Functionality in Repository
export const getAllIndustryNaturesRepository = async (): Promise<industryDocument[]> => {
  return industryModel
    .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
    .select("name")
    .sort({ createdAt: -1 });
};

// Get All Task Module Functionality in Repository
export const getAllTaskModulesRepository = async (): Promise<taskModuleDocument[]> => {
  return taskModuleModel
    .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
    .select("name")
    .sort({ createdAt: -1 });
};

// Get All Priority Functionality in Repository
export const getAllPriorityRepository = async (): Promise<priorityDocument[]> => {
  return priorityModel
    .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
    .select("name")
    .sort({ createdAt: -1 });
};

// Get All Role Functionality in Repository
export const getAllRoleRepository = async (): Promise<roleBaseDocument[]> => {
  return roleModel
    .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
    .select("name")
    .sort({ createdAt: -1 });
};

// Get all Industry Project Functionality in Repository
export const getAllIndustryProjectsRepository = async (): Promise<
  industryProjectDocument[]
> => {
  return industryProjectsModels
    .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
    .select("projectName")
    .sort({ createdAt: -1 });
};