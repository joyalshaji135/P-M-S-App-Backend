import logger from '@src/utils/logger';
import * as segmentationApiRepository from './segmentation-api.repository';
import { taskRoleDocument } from '@src/models/master-workspace-modules-models/task-role.models';

// taskAssignedClientServices
export const taskAssignedClientServices = async (client_id: string) => {
  logger.info(`Getting Task Wise Client list with ID ${client_id}`);
  return segmentationApiRepository.taskAssignedClientRepository(client_id);
};

// projectAssignedClientServices
export const projectAssignedClientServices = async (client_id: string) => {
  logger.info(`Getting Project Wise Client list with ID ${client_id}`);
  return segmentationApiRepository.projectAssignedClientRepository(client_id);
};

// getAllIndustryProjects
export const getAllIndustryProjects = async () => {
  logger.info('Getting all industry projects');
  return segmentationApiRepository.getAllIndustryProjects();
};

// getAllGoogleMeetings
export const getAllGoogleMeetings = async () => {
  logger.info('Getting all google meetings');
  return segmentationApiRepository.getAllGoogleMeetings();
};

// getAllFileDocuments
export const getAllFileDocuments = async () => {
  logger.info('Getting all file documents');
  return segmentationApiRepository.getAllFileDocuments();
};



// updateProjectTask this function using only two fields update using patch
export const updateProjectTaskPatch = async (
  id: string,
  updateData: Partial<taskRoleDocument>,
) => {
  console.log('Updating project', updateData)
  return segmentationApiRepository.updateProjectTaskPatch(id, updateData);
};