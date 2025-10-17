"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIndustryProjectsRepository = exports.getAllRoleRepository = exports.getAllPriorityRepository = exports.getAllTaskModulesRepository = exports.getAllIndustryNaturesRepository = exports.getAllDomainListRepository = exports.getAllCustomerTypeListRepository = exports.getAllCompanyOwnerListRepository = exports.getAllTeamManagerListRepository = exports.getAllTeamMemberListRepository = void 0;
const customer_type_model_1 = __importDefault(require("@src/models/lookups-models/customer-type.model"));
const domain_model_1 = __importDefault(require("@src/models/lookups-models/domain.model"));
const industry_model_1 = __importDefault(require("@src/models/lookups-models/industry.model"));
const role_model_1 = __importDefault(require("@src/models/lookups-models/role.model"));
const task_module_model_1 = __importDefault(require("@src/models/lookups-models/task-module.model"));
const priority_model_1 = __importDefault(require("@src/models/lookups-models/priority.model"));
const industry_projects_models_1 = __importDefault(require("@src/models/master-workspace-modules-models/industry-projects.models"));
const customer_models_1 = __importDefault(require("@src/models/master-manage-modules-models/customer.models"));
// Team Member Get Functionality in Repository
const getAllTeamMemberListRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default
        .find({ isDeleted: false, role: 'team-members' }) // Make sure 'team-members' matches your system role
        .select('name email phone role')
        .sort({ createdAt: -1 });
});
exports.getAllTeamMemberListRepository = getAllTeamMemberListRepository;
// Team Manager Get Functionality in Repository
const getAllTeamManagerListRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default
        .find({ isDeleted: false, role: 'team-managers' }) // Make sure 'team-managers' matches your system role
        .select('name email phone role')
        .sort({ createdAt: -1 });
});
exports.getAllTeamManagerListRepository = getAllTeamManagerListRepository;
// Company Owner Get Functionality in Repository
const getAllCompanyOwnerListRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default
        .find({ isDeleted: false, role: 'company-owners' }) // Make sure 'company-owners' matches your system role
        .select('name email phone role')
        .sort({ createdAt: -1 });
});
exports.getAllCompanyOwnerListRepository = getAllCompanyOwnerListRepository;
// Get All  CustomerType List Functionality in Repository
const getAllCustomerTypeListRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return customer_type_model_1.default
        .find({ isDeleted: false })
        .select('name')
        .sort({ createdAt: -1 });
});
exports.getAllCustomerTypeListRepository = getAllCustomerTypeListRepository;
// Get All Domain Lists Functionality in Repository
const getAllDomainListRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return domain_model_1.default
        .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
        .select('name')
        .sort({ createdAt: -1 });
});
exports.getAllDomainListRepository = getAllDomainListRepository;
// Get All Industry Nature Functionality in Repository
const getAllIndustryNaturesRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return industry_model_1.default
        .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
        .select('name')
        .sort({ createdAt: -1 });
});
exports.getAllIndustryNaturesRepository = getAllIndustryNaturesRepository;
// Get All Task Module Functionality in Repository
const getAllTaskModulesRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return task_module_model_1.default
        .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
        .select('name')
        .sort({ createdAt: -1 });
});
exports.getAllTaskModulesRepository = getAllTaskModulesRepository;
// Get All Priority Functionality in Repository
const getAllPriorityRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return priority_model_1.default
        .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
        .select('name')
        .sort({ createdAt: -1 });
});
exports.getAllPriorityRepository = getAllPriorityRepository;
// Get All Role Functionality in Repository
const getAllRoleRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return role_model_1.default
        .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
        .select('name')
        .sort({ createdAt: -1 });
});
exports.getAllRoleRepository = getAllRoleRepository;
// Get all Industry Project Functionality in Repository
const getAllIndustryProjectsRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return industry_projects_models_1.default
        .find({ isDeleted: false }) // Make sure 'company-owners' matches your system role
        .select('projectName')
        .sort({ createdAt: -1 });
});
exports.getAllIndustryProjectsRepository = getAllIndustryProjectsRepository;
