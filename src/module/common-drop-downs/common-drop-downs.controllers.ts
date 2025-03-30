import { Request, Response } from 'express';
import * as CommonDropdownService from './common-drop-downs.services';
import { RequestWithAuthData } from '@src/@types/express';
import { message } from '@constants/responseMessage';
import logger from '@utils/logger';

// Get All Team Member List Functionality
export const getAllTeamMemberList = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const teamMemberList = await CommonDropdownService.getAllTeamMemberList();
    return res.status(200).json({
      success: true,
      message: message.GET_TEAM_MEMBER_LIST_SUCCESS,
      teamMemberList,
    });
  } catch (error: any) {
    logger.error('Error in getAllTeamMemberList', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Team Member List Functionality
export const getAllTeamManagerList = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const teamManagerList = await CommonDropdownService.getAllTeamManagerList();
    return res.status(200).json({
      success: true,
      message: message.GET_TEAM_MANAGER_LIST_SUCCESS,
      teamManagerList,
    });
  } catch (error: any) {
    logger.error('Error in getAllTeamManagerList', error.message);
    return res.status(500).json({
  
})}}

// Get All Company Owner List Functionality
export const getAllCompanyOwnerList = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const companyOwnerList = await CommonDropdownService.getAllCompanyOwnerList();
    return res.status(200).json({
      success: true,
      message: message.GET_COMPANY_OWNER_LIST_SUCCESS,
      companyOwnerList,
    });
  } catch (error: any) {
    logger.error('Error in getAllCompanyOwnerList', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Customer Type List Functionality
export const getAllCustomerTypeList = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const customerTypeList = await CommonDropdownService.getAllCustomerTypeList();
    return res.status(200).json({
      success: true,
      message: message.GET_CUSTOMER_TYPE_LIST_SUCCESS,
      customerTypeList,
    });
  } catch (error: any) {
    logger.error('Error in getAllCustomerTypeList', error.message);
    return res.status(500).json({
  
})}}

// Get All Domain Lists Functionality
export const getAllDomainLists = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const domainLists = await CommonDropdownService.getAllDomainLists();
    return res.status(200).json({
      success: true,
      message: message.GET_DOMAIN_LIST_SUCCESS,
      domainLists,
    });
  } catch (error: any) {
    logger.error('Error in getAllDomainLists', error.message);
    return res.status(500).json({ 
      success: false,
      message: error.message,
    });
  }
};

// Get All Industry Nature Functionality
export const getAllIndustryNatures = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const industryNatures = await CommonDropdownService.getAllIndustryNatures();
    return res.status(200).json({
      success: true,
      message: message.GET_INDUSTRY_NATURE_LIST_SUCCESS,
      industryNatures,
    });
  } catch (error: any) {
    logger.error('Error in getAllIndustryNatures', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    }); 
  }
};

// Get All Task Module Functionality
export const getAllTaskModules = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const taskModules = await CommonDropdownService.getAllTaskModules();
    return res.status(200).json({
      success: true,
      message: message.GET_TASK_MODULE_LIST_SUCCESS,
      taskModules,
    });
  } catch (error: any) {
    logger.error('Error in getAllTaskModules', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Priority Functionality
export const getAllPriority = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const priority = await CommonDropdownService.getAllPriority();
    return res.status(200).json({
      success: true,
      message: message.GET_PRIORITY_LIST_SUCCESS,
      priority,
    });
  } catch (error: any) {
    logger.error('Error in getAllPriority', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Role Functionality
export const getAllRole = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const role = await CommonDropdownService.getAllRole();
    return res.status(200).json({
      success: true,
      message: message.GET_ROLE_LIST_SUCCESS,
      role,
    });
  } catch (error: any) {
    logger.error('Error in getAllRole', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Industry Project Functionality
export const getAllIndustryProjects = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const industryProjects = await CommonDropdownService.getAllIndustryProjects();
    return res.status(200).json({
      success: true,
      message: message.GET_INDUSTRY_PROJECT_LIST_SUCCESS,
      industryProjects,
    });
  } catch (error: any) {
    logger.error('Error in getAllIndustryProjects', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};