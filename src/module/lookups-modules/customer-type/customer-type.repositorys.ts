import mongoose from 'mongoose';
import customerTypeModel, {
  customerTypeDocument,
} from '@models/lookups-models/customer-type.model';

export const create = async (
  customerTypeData: Partial<customerTypeDocument>,
): Promise<customerTypeDocument> => {
  const customerType = new customerTypeModel(customerTypeData);
  return await customerType.save();
};
export const isNameExists = async (name: string, idToExclude?: string) => {
  const filter: any = {
    name: name,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await customerTypeModel.findOne(filter).exec();
};

export const isNameAliasExists = async (
  nameAlias: string,
  idToExclude?: string,
) => {
  const filter: any = {
    nameAlias: nameAlias,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await customerTypeModel.findOne(filter).exec();
};

export const findById = async (
  id: string,
): Promise<customerTypeDocument | null> => {
  return customerTypeModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<customerTypeDocument>,
): Promise<customerTypeDocument | null> => {
  return customerTypeModel
    .findByIdAndUpdate(
      id,
      {
        $set: {
          ...updateData,
          userUpdatedBy: updateData.userUpdatedBy,
          userUpdatedDate: new Date(),
        },
      },
      { new: true, runValidators: true },
    )
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const getAllCustomerTypes = async () => {
  return customerTypeModel
    .find({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deleteCustomerType = async (
  customerTypeId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return customerTypeModel.findByIdAndUpdate(
    customerTypeId,
    {
      $set: {
        isDeleted: true,
        deletedBy,
        deletedAt: new Date(),
      },
    },
    { new: true },
  );
};

export const changeCustomerTypeStatus = async (
  id: string,
  updatedData: Partial<customerTypeDocument>,
) => {
  return customerTypeModel.findByIdAndUpdate(
    id,
    {
      $set: {
        status: updatedData.status,
        userUpdatedBy: updatedData.userUpdatedBy,
        userUpdatedDate: updatedData.userUpdatedDate,
      },
    },
    { new: true, runValidators: true },
  );
};
