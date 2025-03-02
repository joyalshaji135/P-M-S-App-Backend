import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as industryProjectRepository from './industry-projects.repository';
import { industryProjectDocument } from '@models/master-workspace-modules-models/industry-projects.models';

export const createIndustryProject = async (
  industryProjectData: Partial<industryProjectDocument>,
): Promise<industryProjectDocument> => {
  try {
    logger.info('Creating a new industry project profile', {
      industryProjectData,
    });
    if (!industryProjectData.projectName) {
      throw new Error('Industry project name is required.');
    }

    if (!industryProjectData.nameAlias) {
      throw new Error('Industry project name alias is required.');
    }

    const existingIndustryProjectByName =
      await industryProjectRepository.isNameExists(
        industryProjectData.projectName,
      );
    const existingIndustryProjectByAlias =
      await industryProjectRepository.isNameAliasExists(
        industryProjectData.nameAlias,
      );

    if (existingIndustryProjectByName) {
      throw new Error('An industry project with the same name already exists.');
    }

    if (existingIndustryProjectByAlias) {
      throw new Error(
        'An industry project with the same name alias already exists.',
      );
    }

    const newIndustryProjectProfile =
      await industryProjectRepository.create(industryProjectData);
    await Log.create({
      userId: newIndustryProjectProfile.createdBy,
      module: 'industryProject',
      action: 'create',
      actionId: newIndustryProjectProfile._id,
      description: `Created a new industry project profile with name: ${newIndustryProjectProfile.projectName}`,
    });

    return newIndustryProjectProfile;
  } catch (error: any) {
    throw new Error(
      `Error creating industry project profile: ${error.message}`,
    );
  }
};

export const editIndustryProject = async (
  industryProjectId: string,
  industryProjectData: Partial<industryProjectDocument>,
): Promise<industryProjectDocument | null> => {
  try {
    logger.info(
      `Editing industry project profile with ID ${industryProjectId}`,
      {
        industryProjectData,
      },
    );
    if (industryProjectData.projectName) {
      const existingIndustryProject =
        await industryProjectRepository.isNameExists(
          industryProjectData.projectName,
          industryProjectId,
        );
      if (existingIndustryProject) {
        throw new Error(
          'An industry project with the same name already exists.',
        );
      }
    }

    if (industryProjectData.nameAlias) {
      const existingIndustryProject =
        await industryProjectRepository.isNameAliasExists(
          industryProjectData.nameAlias,
          industryProjectId,
        );
      if (existingIndustryProject) {
        throw new Error(
          'An industry project with the same name alias already exists.',
        );
      }
    }

    const updatedIndustryProjectProfile =
      await industryProjectRepository.updateById(
        industryProjectId,
        industryProjectData,
      );

    if (!updatedIndustryProjectProfile) {
      throw new Error(
        `Industry project profile with ID ${industryProjectId} not found`,
      );
    }

    await Log.create({
      userId: updatedIndustryProjectProfile.userUpdatedBy,
      module: 'industryProject',
      action: 'edit',
      actionId: updatedIndustryProjectProfile._id,
      description: `Updated industry project profile with ID ${industryProjectId}`,
    });

    return updatedIndustryProjectProfile;
  } catch (error: any) {
    throw new Error(
      `Error updating industry project profile: ${error.message}`,
    );
  }
};

export const getAllIndustryProjects = async () => {
  logger.info('Getting all industry projects');
  return industryProjectRepository.getAllIndustryProjects();
};

export const getIndustryProjectById = async (id: string) => {
  logger.info(`Getting industry project with ID ${id}`);
  return industryProjectRepository.findById(id);
};

export const deleteIndustryProject = async (
  industryProjectId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(
      `Deleting industry project with ID ${industryProjectId} by user ${deletedBy}`,
    );

    const deletedIndustryProject =
      await industryProjectRepository.deleteIndustryProject(
        industryProjectId,
        deletedBy,
      );

    if (!deletedIndustryProject) {
      throw new Error(
        `Industry project profile with ID ${industryProjectId} not found`,
      );
    }
    return deletedIndustryProject;
  } catch (error: any) {
    throw new Error(
      `Error deleting industry project profile: ${error.message}`,
    );
  }
};

export const updateIndustryProjectStatus = async (
  id: string,
  updatedData: Partial<industryProjectDocument>,
): Promise<industryProjectDocument | null> => {
  try {
    logger.info(
      `Updating status for industry project with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus =
      await industryProjectRepository.changeIndustryProjectStatus(
        id,
        updatedData,
      );

    if (!updatedStatus) {
      throw new Error(`Industry project profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'industryProject',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for industry project profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(
      `Error updating industry project profile status: ${error.message}`,
    );
  }
};
