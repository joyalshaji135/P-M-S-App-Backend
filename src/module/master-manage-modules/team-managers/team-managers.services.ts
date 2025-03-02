import mongoose from 'mongoose';
import { customerDocument } from '@models/master-manage-modules-models/customer.models';
import logger from '@utils/logger';
import * as teamManagerRepository from './team-managers.repository';
import { message } from '@constants/responseMessage';
import bcrypt from 'bcrypt';
import Log from '@models/lookups-models/log.model';

export const createTeamManagerServices = async (
  teamManagerData: Partial<customerDocument>,
): Promise<Partial<customerDocument>> => {
  logger.info(`Creating team manager: ${teamManagerData.email}`);

  const { password, email, ...otherTeamManagerData } = teamManagerData;

  if (!password) {
    throw new Error(message.PASSWORD_REQUIRED);
  }
  if (!email) {
    throw new Error(message.EMAIL_REQUIRED);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newTeamManager: Partial<customerDocument> = {
    ...otherTeamManagerData,
    password: hashedPassword,
    email,
  };

  const existingTeamManager = await teamManagerRepository.findByEmail(email);
  if (existingTeamManager) {
    throw new Error(message.TEAM_MANAGER_EXISTS);
  }

  const createdTeamManager =
    await teamManagerRepository.createTeamManagerRepository(newTeamManager);

  await Log.create({
    userId: createdTeamManager.createdBy,
    module: 'teamManager',
    action: 'create',
    actionId: createdTeamManager._id,
    description: `Created a new team manager with name: ${createdTeamManager.name}`,
  });

  return createdTeamManager;
};

export const isPhoneNumberExists = async (phone: string) => {
  return await teamManagerRepository.isPhoneNumberExists(phone);
};

export const isEmailExists = async (email: string) => {
  return await teamManagerRepository.isEmailExists(email);
};

export const isTeamManagerNameExists = async (name: string) => {
  return await teamManagerRepository.isTeamManagerNameExists(name);
};

export const editTeamManager = async (
  teamManagerId: string,
  teamManagerData: Partial<customerDocument>,
): Promise<customerDocument | null> => {
  try {
    logger.info(`Editing team manager with ID ${teamManagerId}`, {
      teamManagerData,
    });

    if (teamManagerData.name) {
      const existingTeamManager = await teamManagerRepository.isNameExists(
        teamManagerData.name,
        teamManagerId,
      );
      if (existingTeamManager) {
        throw new Error('A team manager with the same name already exists.');
      }
    }

    if (teamManagerData.password) {
      teamManagerData.password = await bcrypt.hash(
        teamManagerData.password,
        10,
      );
    }

    const updatedTeamManager = await teamManagerRepository.updateTeamManager(
      teamManagerId,
      teamManagerData,
    );

    if (!updatedTeamManager) {
      throw new Error(`Team manager with ID ${teamManagerId} not found`);
    }

    await Log.create({
      userId: updatedTeamManager.userUpdatedBy,
      module: 'teamManager',
      action: 'edit',
      actionId: updatedTeamManager._id,
      description: `Updating team manager account`,
    });

    return updatedTeamManager;
  } catch (error: any) {
    throw new Error(`Error updating team manager: ${error.message}`);
  }
};

export const deleteTeamManager = async (
  teamManagerId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<customerDocument | null> => {
  try {
    const deletedById = new mongoose.Types.ObjectId(deletedBy);
    logger.info(
      `Deleting team manager with ID ${teamManagerId} by user ${deletedById}`,
    );

    const deletedTeamManager = await teamManagerRepository.deleteTeamManager(
      teamManagerId,
      deletedById,
    );
    if (!deletedTeamManager) {
      throw new Error(`Team manager with ID ${teamManagerId} not found`);
    }

    await Log.create({
      userId: deletedTeamManager.deletedBy,
      module: 'teamManager',
      action: 'delete',
      actionId: deletedTeamManager._id,
      description: `Deleting team manager`,
    });

    return deletedTeamManager;
  } catch (error: any) {
    throw new Error(`Error deleting team manager: ${error.message}`);
  }
};

export const getTeamManagerById = async (
  teamManagerId: string,
): Promise<customerDocument | null> => {
  try {
    logger.info(`Fetching team manager with ID ${teamManagerId}`);

    const teamManager =
      await teamManagerRepository.findTeamManagerById(teamManagerId);

    return teamManager;
  } catch (error: any) {
    throw new Error(`Error fetching team manager: ${error.message}`);
  }
};

export const getAllTeamManagers = async (): Promise<customerDocument[]> => {
  try {
    logger.info('Fetching all team managers');

    return await teamManagerRepository.getAllTeamManagers();
  } catch (error: any) {
    throw new Error(`Error fetching team managers: ${error.message}`);
  }
};

export const updateTeamManagerStatus = async (
  id: string,
  updatedData: Partial<customerDocument>,
): Promise<customerDocument | null> => {
  try {
    logger.info(
      `Updating status for team manager with ID ${id} to ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await teamManagerRepository.changeTeamManagerStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Team manager with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedStatus.userUpdatedBy,
      module: 'teamManager',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated the status for team manager with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(`Error updating team manager status: ${error.message}`);
  }
};
