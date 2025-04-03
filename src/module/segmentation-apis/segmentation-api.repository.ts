import mongoose from 'mongoose';
import taskRoleModels, {
  taskRoleDocument,
} from '@src/models/master-workspace-modules-models/task-role.models';
import logger from '@src/utils/logger';
import industryProjectsModels from '@src/models/master-workspace-modules-models/industry-projects.models';
import googleMeetsModels from '@src/models/feature-manage-modules-models/google-meets.models';
import documentFilesModels from '@src/models/feature-manage-modules-models/document-files.models';

// taskAssignedClientServices : client id using assigned task listing

export const taskAssignedClientRepository = async (client_id: string) => {
  logger.info(`Getting Task Wise Client list with ID ${client_id}`);
  return taskRoleModels
    .find({ isDeleted: false, resourceName: client_id })
    .populate('resourceName', 'name email role phone')
    .populate('project', 'projectName industry description projectStatus')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

// projectAssignedClientRepository : client id using assigned project listing
export const projectAssignedClientRepository = async (client_id: string) => {
  logger.info(`Getting Project Wise Client list with ID ${client_id}`);
  return industryProjectsModels
    .find({ isDeleted: false, resourceName: client_id })
    .populate('customer', 'name email role phone')
    .populate('priority', 'name code')
    .populate('industry', 'name code')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

// getAllIndustryProjects
export const getAllIndustryProjects = async () => {
  return industryProjectsModels
    .find({ isDeleted: false })
    .populate('customer', 'name email role phone')
    .populate('industry', 'name code')
    .populate('priority', 'name code')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

// getAllGoogleMeetings
export const getAllGoogleMeetings = async () => {
  return googleMeetsModels
    .find({ isDeleted: false })
    .populate('customer', 'name email role phone')
    .populate('industryProject', 'projectName code')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

// getAllFileDocuments
export const getAllFileDocuments = async () => {
  return documentFilesModels
    .find({ isDeleted: false })
    .populate('industry', 'name code')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

// updateProjectTask this function using only two fields update using patch
export const updateProjectTaskPatch = async (
  id: string,
  updates: Partial<taskRoleDocument>
) => {
  const updatedTask = await taskRoleModels.findOneAndUpdate(
    { _id: id },
    { $set: updates },
    { new: true, lean: true }
  );
  console.log(updatedTask);
  if (!updatedTask) {
    throw new Error(`Task with ID ${id} not found`);
  }

  return updatedTask;
};