import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as roleBaseRepository from './role-base.repositorys';
import { roleBaseDocument } from '@models/lookups-models/role.model';

export const createRoleBaseProfile = async (
  roleBaseData: Partial<roleBaseDocument>,
): Promise<roleBaseDocument> => {
  try {
    logger.info('Creating a new role base profile', { roleBaseData });
    if (!roleBaseData.name) {
      throw new Error('Role base name is required.');
    }

    if (!roleBaseData.nameAlias) {
      throw new Error('Role base name alias is required.');
    }

    const existingRoleBaseByName = await roleBaseRepository.isNameExists(roleBaseData.name);
    const existingRoleBaseByAlias = await roleBaseRepository.isNameAliasExists(roleBaseData.nameAlias);

    if (existingRoleBaseByName) {
      throw new Error('A role base with the same name already exists.');
    }

    if (existingRoleBaseByAlias) {
      throw new Error('A role base with the same name alias already exists.');
    }

    const newRoleBaseProfile = await roleBaseRepository.create(roleBaseData);
    await Log.create({
      userId: newRoleBaseProfile.createdBy,
      module: 'roleBase',
      action: 'create',
      actionId: newRoleBaseProfile._id,
      description: `Created a new role base profile with name: ${newRoleBaseProfile.name}`,
    });

    return newRoleBaseProfile;
  } catch (error: any) {
    throw new Error(`Error creating role base profile: ${error.message}`);
  }
};

export const editRoleBaseProfile = async (
  roleBaseId: string,
  roleBaseData: Partial<roleBaseDocument>,
): Promise<roleBaseDocument | null> => {
  try {
    logger.info(`Editing role base profile with ID ${roleBaseId}`, {
      roleBaseData,
    });
    if (roleBaseData.name) {
      const existingRoleBase = await roleBaseRepository.isNameExists(roleBaseData.name, roleBaseId);
      if (existingRoleBase) {
        throw new Error('A role base with the same name already exists.');
      }
    }

    if (roleBaseData.nameAlias) {
      const existingRoleBase = await roleBaseRepository.isNameAliasExists(roleBaseData.nameAlias, roleBaseId);
      if (existingRoleBase) {
        throw new Error('A role base with the same name alias already exists.');
      }
    }

    const updatedRoleBaseProfile = await roleBaseRepository.updateById(roleBaseId, roleBaseData);

    if (!updatedRoleBaseProfile) {
      throw new Error(`Role base profile with ID ${roleBaseId} not found`);
    }

    await Log.create({
      userId: updatedRoleBaseProfile.userUpdatedBy,
      module: 'roleBase',
      action: 'edit',
      actionId: updatedRoleBaseProfile._id,
      description: `Updated role base profile with ID ${roleBaseId}`,
    });

    return updatedRoleBaseProfile;
  } catch (error: any) {
    throw new Error(`Error updating role base profile: ${error.message}`);
  }
};

export const getAllRoleBases = async () => {
  logger.info('Getting all role bases');
  return roleBaseRepository.getAllRoleBases();
};

export const getRoleBaseById = async (id: string) => {
  logger.info(`Getting role base with ID ${id}`);
  return roleBaseRepository.findById(id);
};

export const deleteRoleBase = async (
  roleBaseId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(`Deleting role base with ID ${roleBaseId} by user ${deletedBy}`);

    const deletedRoleBase = await roleBaseRepository.deleteRoleBase(roleBaseId, deletedBy);

    if (!deletedRoleBase) {
      throw new Error(`Role base profile with ID ${roleBaseId} not found`);
    }
    return deletedRoleBase;
  } catch (error: any) {
    throw new Error(`Error deleting role base profile: ${error.message}`);
  }
};

export const updateRoleBaseStatus = async (
  id: string,
  updatedData: Partial<roleBaseDocument>,
): Promise<roleBaseDocument | null> => {
  try {
    logger.info(
      `Updating status for role base with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await roleBaseRepository.changeRoleBaseStatus(id, updatedData);

    if (!updatedStatus) {
      throw new Error(`Role base profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'roleBase',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for role base profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(`Error updating role base profile status: ${error.message}`);
  }
};