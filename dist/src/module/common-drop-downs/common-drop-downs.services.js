"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIndustryProjects = exports.getAllRole = exports.getAllPriority = exports.getAllTaskModules = exports.getAllIndustryNatures = exports.getAllDomainLists = exports.getAllCustomerTypeList = exports.getAllCompanyOwnerList = exports.getAllTeamManagerList = exports.getAllTeamMemberList = void 0;
exports.fetchStates = fetchStates;
exports.fetchDistrict = fetchDistrict;
const country_state_district = require('@coffeebeanslabs/country_state_district');
// Get All Team Member List Functionality
const commonDropDownRepository = __importStar(require("./common-drop-downs.repositorys"));
const getAllTeamMemberList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamMemberList = yield commonDropDownRepository.getAllTeamMemberListRepository();
        return teamMemberList;
    }
    catch (error) {
        throw new Error('Fail to get team member list');
    }
});
exports.getAllTeamMemberList = getAllTeamMemberList;
// Get All Team Manager List Functionality
const getAllTeamManagerList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamManagerList = yield commonDropDownRepository.getAllTeamManagerListRepository();
        return teamManagerList;
    }
    catch (error) {
        throw new Error('Fail to get team manager list');
    }
});
exports.getAllTeamManagerList = getAllTeamManagerList;
// Get All Company Owner List Functionality
const getAllCompanyOwnerList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyOwnerList = yield commonDropDownRepository.getAllCompanyOwnerListRepository();
        return companyOwnerList;
    }
    catch (error) {
        throw new Error('Fail to get company owner list');
    }
});
exports.getAllCompanyOwnerList = getAllCompanyOwnerList;
// Get All Customer Type List Functionality
const getAllCustomerTypeList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerTypeList = yield commonDropDownRepository.getAllCustomerTypeListRepository();
        return customerTypeList;
    }
    catch (error) {
        throw new Error('Fail to get customer type list');
    }
});
exports.getAllCustomerTypeList = getAllCustomerTypeList;
// Get All Domain Lists Functionality
const getAllDomainLists = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const domainLists = yield commonDropDownRepository.getAllDomainListRepository();
        return domainLists;
    }
    catch (error) {
        throw new Error('Fail to get domain lists');
    }
});
exports.getAllDomainLists = getAllDomainLists;
// Get All Industry Nature Functionality
const getAllIndustryNatures = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const industryNatures = yield commonDropDownRepository.getAllIndustryNaturesRepository();
        return industryNatures;
    }
    catch (error) {
        throw new Error('Fail to get industry natures');
    }
});
exports.getAllIndustryNatures = getAllIndustryNatures;
// Get All Task Module Functionality
const getAllTaskModules = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskModules = yield commonDropDownRepository.getAllTaskModulesRepository();
        return taskModules;
    }
    catch (error) {
        throw new Error('Fail to get task modules');
    }
});
exports.getAllTaskModules = getAllTaskModules;
// Get All Priority Functionality
const getAllPriority = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const priority = yield commonDropDownRepository.getAllPriorityRepository();
        return priority;
    }
    catch (error) {
        throw new Error('Fail to get priority');
    }
});
exports.getAllPriority = getAllPriority;
// Get All Role Functionality
const getAllRole = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield commonDropDownRepository.getAllRoleRepository();
        return role;
    }
    catch (error) {
        throw new Error('Fail to get role');
    }
});
exports.getAllRole = getAllRole;
// Get all Industry Project Functionality
const getAllIndustryProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const industryProjects = yield commonDropDownRepository.getAllIndustryProjectsRepository();
        return industryProjects;
    }
    catch (error) {
        throw new Error('Fail to get industry projects');
    }
});
exports.getAllIndustryProjects = getAllIndustryProjects;
function fetchStates() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const states = country_state_district.getAllStates();
            return states;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching states:', error.message);
            }
            else {
                console.error('Unknown error fetching states');
            }
            throw new Error('Failed to fetch states');
        }
    });
}
function fetchDistrict(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const district = country_state_district.getDistrictsByStateId(id);
            return district;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching districts:', error.message);
            }
            else {
                console.error('Unknown error fetching districts');
            }
            throw new Error('Failed to fetch states');
        }
    });
}
