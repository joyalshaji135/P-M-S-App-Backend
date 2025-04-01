import { Response } from 'express';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../@types/express';
import * as segmentationService from './segmentation-api.services';

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

    const taskAssigned = await segmentationService.taskAssignedClientServices(client_id);

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