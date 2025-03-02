import mongoose from 'mongoose';
import { customerDocument } from '@models/master-manage-modules-models/customer.models';
import logger from '@utils/logger';
import * as companyOwnerRepository from './company-owners.repositorys';
import { message } from '@constants/responseMessage';
import bcrypt from 'bcrypt';
import Log from '@models/lookups-models/log.model';

export const createCompanyOwnerServices = async (
  companyOwnerData: Partial<customerDocument>,
): Promise<Partial<customerDocument>> => {
  logger.info(`Creating company owner: ${companyOwnerData.email}`);

  const { password, email, ...otherCompanyOwnerData } = companyOwnerData;

  if (!password) {
    throw new Error(message.PASSWORD_REQUIRED);
  }
  if (!email) {
    throw new Error(message.EMAIL_REQUIRED);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newCompanyOwner: Partial<customerDocument> = {
    ...otherCompanyOwnerData,
    password: hashedPassword,
    email,
  };

  const existingCompanyOwner = await companyOwnerRepository.findByEmail(email);
  if (existingCompanyOwner) {
    throw new Error(message.COMPANY_OWNER_EXISTS);
  }

  const createdCompanyOwner =
    await companyOwnerRepository.createCompanyOwnerRepository(newCompanyOwner);
  await Log.create({
    userId: createdCompanyOwner.createdBy,
    module: 'companyOwner',
    action: 'create',
    actionId: createdCompanyOwner._id,
    description: `Created a new customer type profile with name: ${createdCompanyOwner.name}`,
  });
  return createdCompanyOwner;
};

export const isPhoneNumberExists = async (phone: string) => {
  return await companyOwnerRepository.isPhoneNumberExists(phone);
};

export const isEmailExists = async (email: string) => {
  return await companyOwnerRepository.isEmailExists(email);
};

export const isCompanyOwnerNameExists = async (name: string) => {
  return await companyOwnerRepository.isCompanyOwnerNameExists(name);
};

export const editCompanyOwner = async (
  companyOwnerId: string,
  companyOwnerData: Partial<customerDocument>,
): Promise<customerDocument | null> => {
  try {
    logger.info(`Editing company owner with ID ${companyOwnerId}`, {
      companyOwnerData,
    });
    if (companyOwnerData.name) {
      const existingCompanyOwner = await companyOwnerRepository.isNameExists(
        companyOwnerData.name,
        companyOwnerId,
      );
      if (existingCompanyOwner) {
        throw new Error('A company owner with the same name already exists.');
      }
    }

    // Comment this code is name alias for company owner is not important

    // if (companyOwnerData.nameAlias) {
    //   const existingCompanyOwner = await companyOwnerRepository.isNameAliasExists(
    //     companyOwnerData.nameAlias,
    //     companyOwnerId,
    //   );
    //   if (existingCompanyOwner) {
    //     throw new Error("A company owner with the same name alias already exists.");
    //   }
    // }
    if (companyOwnerData.password) {
      companyOwnerData.password = await bcrypt.hash(
        companyOwnerData.password,
        10,
      );
    }

    const updatedCompanyOwner = await companyOwnerRepository.updateCompanyOwner(
      companyOwnerId,
      companyOwnerData,
    );
    if (!updatedCompanyOwner) {
      throw new Error(`Company owner with ID ${companyOwnerId} not found`);
    }
    await Log.create({
      userId: updatedCompanyOwner.userUpdatedBy,
      module: 'companyOwner',
      action: 'edit',
      actionId: updatedCompanyOwner._id,
      description: `Updating company owner account group`,
    });

    return updatedCompanyOwner;
  } catch (error: any) {
    throw new Error(`Error updating company owner: ${error.message}`);
  }
};

export const deleteCompanyOwner = async (
  companyOwnerId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<customerDocument | null> => {
  try {
    const deletedById = new mongoose.Types.ObjectId(deletedBy);
    logger.info(
      `Deleting company owner with ID ${companyOwnerId} by user ${deletedById}`,
    );

    const deletedCompanyOwner = await companyOwnerRepository.deleteCompanyOwner(
      companyOwnerId,
      deletedById,
    );
    if (!deletedCompanyOwner) {
      throw new Error(`Company owner with ID ${companyOwnerId} not found`);
    }
    await Log.create({
      userId: deletedCompanyOwner.deletedBy,
      module: 'companyOwner',
      action: 'delete',
      actionId: deletedCompanyOwner._id,
      description: `Deleting company owner`,
    });

    return deletedCompanyOwner;
  } catch (error: any) {
    throw new Error(`Error deleting company owner: ${error.message}`);
  }
};

export const getCompanyOwnerById = async (
  companyOwnerId: string,
): Promise<customerDocument | null> => {
  try {
    logger.info(`Fetching company owner with ID ${companyOwnerId}`);

    const companyOwner =
      await companyOwnerRepository.findCompanyOwnerById(companyOwnerId);

    return companyOwner;
  } catch (error: any) {
    throw new Error(`Error fetching company owner: ${error.message}`);
  }
};

export const getAllCompanyOwners = async (): Promise<customerDocument[]> => {
  try {
    logger.info('Fetching all company owners');

    return await companyOwnerRepository.getAllCompanyOwners();
  } catch (error: any) {
    throw new Error(`Error fetching company owners: ${error.message}`);
  }
};

export const updateCompanyOwnerStatus = async (
  id: string,
  updatedData: Partial<customerDocument>,
): Promise<customerDocument | null> => {
  try {
    logger.info(
      `Updating status for company owner with ID ${id} to ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await companyOwnerRepository.changeCompanyOwnerStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Company owner with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedStatus.userUpdatedBy,
      module: 'companyOwner',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated the status for company owner with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(`Error updating company owner status: ${error.message}`);
  }
};
