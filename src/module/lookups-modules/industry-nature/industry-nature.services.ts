import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as industryNatureRepository from './industry-nature.repository';
import { industryDocument } from '@models/lookups-models/industry.model';

export const createIndustryNatureProfile = async (
  industryNatureData: Partial<industryDocument>,
): Promise<industryDocument> => {
  try {
    logger.info('Creating a new industry nature profile', { industryNatureData });
    if (!industryNatureData.name) {
      throw new Error('Industry nature name is required.');
    }

    if (!industryNatureData.nameAlias) {
      throw new Error('Industry nature name alias is required.');
    }

    const existingIndustryNatureByName = await industryNatureRepository.isNameExists(industryNatureData.name);
    const existingIndustryNatureByAlias = await industryNatureRepository.isNameAliasExists(industryNatureData.nameAlias);

    if (existingIndustryNatureByName) {
      throw new Error('An industry nature with the same name already exists.');
    }

    if (existingIndustryNatureByAlias) {
      throw new Error('An industry nature with the same name alias already exists.');
    }

    const newIndustryNatureProfile = await industryNatureRepository.create(industryNatureData);
    await Log.create({
      userId: newIndustryNatureProfile.createdBy,
      module: 'industryNature',
      action: 'create',
      actionId: newIndustryNatureProfile._id,
      description: `Created a new industry nature profile with name: ${newIndustryNatureProfile.name}`,
    });

    return newIndustryNatureProfile;
  } catch (error: any) {
    throw new Error(`Error creating industry nature profile: ${error.message}`);
  }
};

export const editIndustryNatureProfile = async (
  industryNatureId: string,
  industryNatureData: Partial<industryDocument>,
): Promise<industryDocument | null> => {
  try {
    logger.info(`Editing industry nature profile with ID ${industryNatureId}`, {
      industryNatureData,
    });
    if (industryNatureData.name) {
      const existingIndustryNature = await industryNatureRepository.isNameExists(industryNatureData.name, industryNatureId);
      if (existingIndustryNature) {
        throw new Error('An industry nature with the same name already exists.');
      }
    }

    if (industryNatureData.nameAlias) {
      const existingIndustryNature = await industryNatureRepository.isNameAliasExists(industryNatureData.nameAlias, industryNatureId);
      if (existingIndustryNature) {
        throw new Error('An industry nature with the same name alias already exists.');
      }
    }

    const updatedIndustryNatureProfile = await industryNatureRepository.updateById(industryNatureId, industryNatureData);

    if (!updatedIndustryNatureProfile) {
      throw new Error(`Industry nature profile with ID ${industryNatureId} not found`);
    }

    await Log.create({
      userId: updatedIndustryNatureProfile.userUpdatedBy,
      module: 'industryNature',
      action: 'edit',
      actionId: updatedIndustryNatureProfile._id,
      description: `Updated industry nature profile with ID ${industryNatureId}`,
    });

    return updatedIndustryNatureProfile;
  } catch (error: any) {
    throw new Error(`Error updating industry nature profile: ${error.message}`);
  }
};

export const getAllIndustryNatures = async () => {
  logger.info('Getting all industry natures');
  return industryNatureRepository.getAllIndustrynatures();
};

export const getIndustryNatureById = async (id: string) => {
  logger.info(`Getting industry nature with ID ${id}`);
  return industryNatureRepository.findById(id);
};

export const deleteIndustryNature = async (
  industryNatureId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(`Deleting industry nature with ID ${industryNatureId} by user ${deletedBy}`);

    const deletedIndustryNature = await industryNatureRepository.deleteIndustrynature(industryNatureId, deletedBy);

    if (!deletedIndustryNature) {
      throw new Error(`Industry nature profile with ID ${industryNatureId} not found`);
    }
    return deletedIndustryNature;
  } catch (error: any) {
    throw new Error(`Error deleting industry nature profile: ${error.message}`);
  }
};

export const updateIndustryNatureStatus = async (
  id: string,
  updatedData: Partial<industryDocument>,
): Promise<industryDocument | null> => {
  try {
    logger.info(
      `Updating status for industry nature with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await industryNatureRepository.changeIndustrynatureStatus(id, updatedData);

    if (!updatedStatus) {
      throw new Error(`Industry nature profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'industryNature',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for industry nature profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(`Error updating industry nature profile status: ${error.message}`);
  }
};