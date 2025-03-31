import mongoose from 'mongoose';
import { customerDocument } from '@models/master-manage-modules-models/customer.models';
import logger from '@utils/logger';
import * as teamMemberRepository from './team-members.repository';
import { message } from '@constants/responseMessage';
import bcrypt from 'bcrypt';
import Log from '@models/lookups-models/log.model';

export const createTeamMemberServices = async (
  teamMemberData: Partial<customerDocument>,
): Promise<Partial<customerDocument>> => {
  logger.info(`Creating team member: ${teamMemberData.email}`);

  const { password = '12345', email, ...otherTeamMemberData } = teamMemberData;

  if (!password) {
    throw new Error(message.PASSWORD_REQUIRED);
  }
  if (!email) {
    throw new Error(message.EMAIL_REQUIRED);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newTeamMember: Partial<customerDocument> = {
    ...otherTeamMemberData,
    password: hashedPassword,
    email,
  };

  const existingTeamMember = await teamMemberRepository.findByEmail(email);
  if (existingTeamMember) {
    throw new Error(message.TEAM_MEMBER_EXISTS);
  }

  const createdTeamMember =
    await teamMemberRepository.createTeamMemberRepository(newTeamMember);

  await Log.create({
    userId: createdTeamMember.createdBy,
    module: 'teamMember',
    action: 'create',
    actionId: createdTeamMember._id,
    description: `Created a new team member with name: ${createdTeamMember.name}`,
  });

  return createdTeamMember;
};

export const isPhoneNumberExists = async (phone: string) => {
  return await teamMemberRepository.isPhoneNumberExists(phone);
};

export const isEmailExists = async (email: string) => {
  return await teamMemberRepository.isEmailExists(email);
};

export const isTeamMemberNameExists = async (name: string) => {
  return await teamMemberRepository.isTeamMemberNameExists(name);
};

export const editTeamMember = async (
  teamMemberId: string,
  teamMemberData: Partial<customerDocument>,
): Promise<customerDocument | null> => {
  try {
    logger.info(`Editing team member with ID ${teamMemberId}`, {
      teamMemberData,
    });

    if (teamMemberData.name) {
      const existingTeamMember = await teamMemberRepository.isNameExists(
        teamMemberData.name,
        teamMemberId,
      );
      if (existingTeamMember) {
        throw new Error('A team member with the same name already exists.');
      }
    }

    const updatedTeamMember = await teamMemberRepository.updateTeamMember(
      teamMemberId,
      teamMemberData,
    );

    if (!updatedTeamMember) {
      throw new Error(`Team member with ID ${teamMemberId} not found`);
    }

    await Log.create({
      userId: updatedTeamMember.userUpdatedBy,
      module: 'teamMember',
      action: 'edit',
      actionId: updatedTeamMember._id,
      description: `Updating team member account`,
    });

    return updatedTeamMember;
  } catch (error: any) {
    throw new Error(`Error updating team member: ${error.message}`);
  }
};

export const deleteTeamMember = async (
  teamMemberId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<customerDocument | null> => {
  try {
    const deletedById = new mongoose.Types.ObjectId(deletedBy);
    logger.info(
      `Deleting team member with ID ${teamMemberId} by user ${deletedById}`,
    );

    const deletedTeamMember = await teamMemberRepository.deleteTeamMember(
      teamMemberId,
      deletedById,
    );
    if (!deletedTeamMember) {
      throw new Error(`Team member with ID ${teamMemberId} not found`);
    }

    await Log.create({
      userId: deletedTeamMember.deletedBy,
      module: 'teamMember',
      action: 'delete',
      actionId: deletedTeamMember._id,
      description: `Deleting team member`,
    });

    return deletedTeamMember;
  } catch (error: any) {
    throw new Error(`Error deleting team member: ${error.message}`);
  }
};

export const getTeamMemberById = async (
  teamMemberId: string,
): Promise<customerDocument | null> => {
  try {
    logger.info(`Fetching team member with ID ${teamMemberId}`);

    const teamMember =
      await teamMemberRepository.findTeamMemberById(teamMemberId);

    return teamMember;
  } catch (error: any) {
    throw new Error(`Error fetching team member: ${error.message}`);
  }
};

export const getAllTeamMembers = async (): Promise<customerDocument[]> => {
  try {
    logger.info('Fetching all team members');

    return await teamMemberRepository.getAllTeamMembers();
  } catch (error: any) {
    throw new Error(`Error fetching team members: ${error.message}`);
  }
};

export const updateTeamMemberStatus = async (
  id: string,
  updatedData: Partial<customerDocument>,
): Promise<customerDocument | null> => {
  try {
    logger.info(
      `Updating status for team member with ID ${id} to ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await teamMemberRepository.changeTeamMemberStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Team member with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedStatus.userUpdatedBy,
      module: 'teamMember',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated the status for team member with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(`Error updating team member status: ${error.message}`);
  }
};
