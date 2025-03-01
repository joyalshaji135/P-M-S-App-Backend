import mongoose from 'mongoose';
import logger from '../../../utils/logger';
import Log from '@models/lookups-models/log.model';

import * as customerTypeRepository from './customer-type.repositorys';
import { customerTypeDocument } from '@models/lookups-models/customer-type.model';

export const createCustomerTypeProfile = async (
  customerTypeData: Partial<customerTypeDocument>,
): Promise<customerTypeDocument> => {
  try {
    logger.info('Creating a new customer type profile', { customerTypeData });
    if (!customerTypeData.name) {
      throw new Error('Customer type name is required.');
    }

    if (!customerTypeData.nameAlias) {
      throw new Error('Customer type name alias is required.');
    }

    const existingCustomerTypeByName =
      await customerTypeRepository.isNameExists(customerTypeData.name);
    const existingCustomerTypeByAlias =
      await customerTypeRepository.isNameAliasExists(
        customerTypeData.nameAlias,
      );

    if (existingCustomerTypeByName) {
      throw new Error('A customer type with the same name already exists.');
    }

    if (existingCustomerTypeByAlias) {
      throw new Error(
        'A customer type with the same name alias already exists.',
      );
    }

    const newCustomerTypeProfile =
      await customerTypeRepository.create(customerTypeData);
    await Log.create({
      userId: newCustomerTypeProfile.createdBy,
      module: 'customerType',
      action: 'create',
      actionId: newCustomerTypeProfile._id,
      description: `Created a new customer type profile with name: ${newCustomerTypeProfile.name}`,
    });

    return newCustomerTypeProfile;
  } catch (error: any) {
    throw new Error(`Error creating customer type profile: ${error.message}`);
  }
};

export const editCustomerTypeProfile = async (
  customerTypeId: string,
  customerTypeData: Partial<customerTypeDocument>,
): Promise<customerTypeDocument | null> => {
  try {
    logger.info(`Editing customer type profile with ID ${customerTypeId}`, {
      customerTypeData,
    });
    if (customerTypeData.name) {
      const existingCustomerType = await customerTypeRepository.isNameExists(
        customerTypeData.name,
        customerTypeId,
      );
      if (existingCustomerType) {
        throw new Error('A customer type with the same name already exists.');
      }
    }

    if (customerTypeData.nameAlias) {
      const existingCustomerType =
        await customerTypeRepository.isNameAliasExists(
          customerTypeData.nameAlias,
          customerTypeId,
        );
      if (existingCustomerType) {
        throw new Error(
          'A customer type with the same name alias already exists.',
        );
      }
    }

    const updatedCustomerTypeProfile = await customerTypeRepository.updateById(
      customerTypeId,
      customerTypeData,
    );

    if (!updatedCustomerTypeProfile) {
      throw new Error(
        `Customer type profile with ID ${customerTypeId} not found`,
      );
    }

    await Log.create({
      userId: updatedCustomerTypeProfile.updatedBy,
      module: 'customerType',
      action: 'edit',
      actionId: updatedCustomerTypeProfile._id,
      description: `Updated customer type profile with ID ${customerTypeId}`,
    });

    return updatedCustomerTypeProfile;
  } catch (error: any) {
    throw new Error(`Error updating customer type profile: ${error.message}`);
  }
};

export const getAllCustomerTypes = async () => {
  logger.info('Getting all customer types');
  return customerTypeRepository.getAllCustomerTypes();
};

export const getCustomerTypeById = async (id: string) => {
  logger.info(`Getting customer type with ID ${id}`);
  return customerTypeRepository.findById(id);
};

export const deleteCustomerType = async (
  customerTypeId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(
      `Deleting customer type with ID ${customerTypeId} by user ${deletedBy}`,
    );

    const deletedCustomerType = await customerTypeRepository.deleteCustomerType(
      customerTypeId,
      deletedBy,
    );

    if (!deletedCustomerType) {
      throw new Error(
        `Customer type profile with ID ${customerTypeId} not found`,
      );
    }
    return deletedCustomerType;
  } catch (error: any) {
    throw new Error(`Error deleting customer type profile: ${error.message}`);
  }
};

export const updateCustomerTypeStatus = async (
  id: string,
  updatedData: Partial<customerTypeDocument>,
): Promise<customerTypeDocument | null> => {
  try {
    logger.info(
      `Updating status for customer type with ID ${id} to ${updatedData.status} by user ${updatedData.updatedBy}`,
    );

    const updatedStatus = await customerTypeRepository.changeCustomerTypeStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Customer type profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.updatedBy,
      module: 'customerType',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for customer type profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(
      `Error updating customer type profile status: ${error.message}`,
    );
  }
};
