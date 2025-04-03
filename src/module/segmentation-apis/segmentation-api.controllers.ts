import { Response } from 'express';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../@types/express';
import * as segmentationService from './segmentation-api.services';
import { getTaskRoleById } from '../master-workspace-modules/task-roles/task-roles.services';

// taskAssignedClient this function
export const taskAssignedClientController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { client_id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const taskAssigned =
      await segmentationService.taskAssignedClientServices(client_id);

    if (!taskAssigned) {
      return res.status(204).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      taskAssigned,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// projectAssignedClientController
export const projectAssignedClientController = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { client_id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const projectAssigned =
      await segmentationService.projectAssignedClientServices(client_id);

    if (!projectAssigned) {
      return res.status(204).json({
        success: false,
        message: message.TODO_LIST_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      projectAssigned,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getAllIndustryProjects
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

    const industryProjects = await segmentationService.getAllIndustryProjects();
    return res.status(200).json({
      success: true,
      message: message.GET_INDUSTRY_PROJECT_LIST_SUCCESS,
      industryProjects,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getAllGoogleMeetings
export const getAllGoogleMeetings = async (
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

    const googleMeetings = await segmentationService.getAllGoogleMeetings();
    return res.status(200).json({
      success: true,
      message: message.GET_GOOGLE_MEETING_LIST_SUCCESS,
      googleMeetings,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getAllFileDocuments
export const getAllFileDocuments = async (
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
    const fileDocuments = await segmentationService.getAllFileDocuments();

    return res.status(200).json({
      success: true,
      message: message.GET_FILE_DOCUMENT_LIST_SUCCESS,
      fileDocuments,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// updateProjectTask
export const updateProjectTask = async (
  req: RequestWithAuthData,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const taskRoleData = {
    ...req.body,
    userUpdatedDate: new Date(),
    userUpdatedBy: req.userId,
  };
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    if (req.body.taskName) {
      const taskName = req.body.taskName;
      const nameAlias = taskName
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, '');
      taskRoleData.nameAlias = nameAlias;
    }

    const updatedTaskRole = await segmentationService.updateProjectTask(
      id,
      taskRoleData,
    );

    return res.status(200).json({
      success: true,
      message: message.TASK_ROLE_UPDATED_SUCCESS,
      taskRole: updatedTaskRole,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
