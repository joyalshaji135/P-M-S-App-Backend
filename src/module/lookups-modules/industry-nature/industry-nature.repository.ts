import mongoose from 'mongoose';
import industryModel, {
  industryDocument,
} from '@models/lookups-models/industry.model';

export const create = async (
  industrynatureData: Partial<industryDocument>,
): Promise<industryDocument> => {
  const industrynature = new industryModel(industrynatureData);
  return await industrynature.save();
};

export const isNameExists = async (name: string, idToExclude?: string) => {
  const filter: any = {
    name: name,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await industryModel.findOne(filter).exec();
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

  return await industryModel.findOne(filter).exec();
};

export const findById = async (
  id: string,
): Promise<industryDocument | null> => {
  return industryModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<industryDocument>,
): Promise<industryDocument | null> => {
  return industryModel
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

export const getAllIndustrynatures = async () => {
  return industryModel
    .find({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deleteIndustrynature = async (
  industrynatureId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return industryModel.findByIdAndUpdate(
    industrynatureId,
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

export const changeIndustrynatureStatus = async (
  id: string,
  updatedData: Partial<industryDocument>,
) => {
  return industryModel.findByIdAndUpdate(
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