import mongoose from 'mongoose';
import priorityModel, {
  priorityDocument,
} from '@models/lookups-models/priority.model';

export const create = async (
  priorityData: Partial<priorityDocument>,
): Promise<priorityDocument> => {
  const priority = new priorityModel(priorityData);
  return await priority.save();
};

export const isNameExists = async (name: string, idToExclude?: string) => {
  const filter: any = {
    name: name,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await priorityModel.findOne(filter).exec();
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

  return await priorityModel.findOne(filter).exec();
};

export const findById = async (
  id: string,
): Promise<priorityDocument | null> => {
  return priorityModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<priorityDocument>,
): Promise<priorityDocument | null> => {
  return priorityModel
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

export const getAllPriorities = async () => {
  return priorityModel
    .find({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deletePriority = async (
  priorityId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return priorityModel.findByIdAndUpdate(
    priorityId,
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

export const changePriorityStatus = async (
  id: string,
  updatedData: Partial<priorityDocument>,
) => {
  return priorityModel.findByIdAndUpdate(
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
export function createTaskModuleProfile(taskModuleData: any) {
  throw new Error('Function not implemented.');
}

export function getPriorityById(id: string) {
  throw new Error('Function not implemented.');
}

export function editPriorityProfile(id: string, priorityData: any) {
  throw new Error('Function not implemented.');
}
