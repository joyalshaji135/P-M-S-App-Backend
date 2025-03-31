import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as domainRepository from './domain.repository';
import { domainDocument } from '@models/lookups-models/domain.model';

export const createDomainProfile = async (
  domainData: Partial<domainDocument>,
): Promise<domainDocument> => {
  try {
    logger.info('Creating a new domain profile', { domainData });
    if (!domainData.name) {
      throw new Error('Domain name is required.');
    }

    if (!domainData.nameAlias) {
      throw new Error('Domain name alias is required.');
    }

    const existingDomainByName = await domainRepository.isNameExists(
      domainData.name,
    );
    const existingDomainByAlias = await domainRepository.isNameAliasExists(
      domainData.nameAlias,
    );

    if (existingDomainByName) {
      throw new Error('A domain with the same name already exists.');
    }

    if (existingDomainByAlias) {
      throw new Error('A domain with the same name alias already exists.');
    }

    const newDomainProfile = await domainRepository.create(domainData);
    await Log.create({
      userId: newDomainProfile.createdBy,
      module: 'domain',
      action: 'create',
      actionId: newDomainProfile._id,
      description: `Created a new domain profile with name: ${newDomainProfile.name}`,
    });

    return newDomainProfile;
  } catch (error: any) {
    throw new Error(`Error creating domain profile: ${error.message}`);
  }
};

export const editDomainProfile = async (
  domainId: string,
  domainData: Partial<domainDocument>,
): Promise<domainDocument | null> => {
  try {
    logger.info(`Editing domain profile with ID ${domainId}`, {
      domainData,
    });
    if (domainData.name) {
      const existingDomain = await domainRepository.isNameExists(
        domainData.name,
        domainId,
      );
      if (existingDomain) {
        throw new Error('A domain with the same name already exists.');
      }
    }

    if (domainData.nameAlias) {
      const existingDomain = await domainRepository.isNameAliasExists(
        domainData.nameAlias,
        domainId,
      );
      if (existingDomain) {
        throw new Error('A domain with the same name alias already exists.');
      }
    }

    const updatedDomainProfile = await domainRepository.updateById(
      domainId,
      domainData,
    );

    if (!updatedDomainProfile) {
      throw new Error(`Domain profile with ID ${domainId} not found`);
    }

    await Log.create({
      userId: updatedDomainProfile.userUpdatedBy,
      module: 'domain',
      action: 'edit',
      actionId: updatedDomainProfile._id,
      description: `Updated domain profile with ID ${domainId}`,
    });

    return updatedDomainProfile;
  } catch (error: any) {
    throw new Error(`Error updating domain profile: ${error.message}`);
  }
};

export const getAllDomains = async () => {
  logger.info('Getting all domains');
  return domainRepository.getAllDomains();
};

export const getDomainById = async (id: string) => {
  logger.info(`Getting domain with ID ${id}`);
  return domainRepository.findById(id);
};

export const deleteDomain = async (
  domainId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(`Deleting domain with ID ${domainId} by user ${deletedBy}`);

    const deletedDomain = await domainRepository.deleteDomain(
      domainId,
      deletedBy,
    );

    if (!deletedDomain) {
      throw new Error(`Domain profile with ID ${domainId} not found`);
    }
    return deletedDomain;
  } catch (error: any) {
    throw new Error(`Error deleting domain profile: ${error.message}`);
  }
};

export const updateDomainStatus = async (
  id: string,
  updatedData: Partial<domainDocument>,
): Promise<domainDocument | null> => {
  try {
    logger.info(
      `Updating status for domain with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await domainRepository.changeDomainStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Domain profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'domain',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for domain profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(`Error updating domain profile status: ${error.message}`);
  }
};
