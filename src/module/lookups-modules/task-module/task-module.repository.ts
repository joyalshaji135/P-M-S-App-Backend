import mongoose from 'mongoose';
import taskModuleModel, {
  taskModuleDocument,
} from '@models/lookups-models/task-module.model';

export const create = async (
  taskModuleData: Partial<taskModuleDocument>,
): Promise<taskModuleDocument> => {
  const taskModule = new taskModuleModel(taskModuleData);
  return await taskModule.save();
};

export const isNameExists = async (name: string, idToExclude?: string) => {
  const filter: any = {
    name: name,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await taskModuleModel.findOne(filter).exec();
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

  return await taskModuleModel.findOne(filter).exec();
};

export const findById = async (
  id: string,
): Promise<taskModuleDocument | null> => {
  return taskModuleModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<taskModuleDocument>,
): Promise<taskModuleDocument | null> => {
  return taskModuleModel
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

export const getAllTaskModules = async () => {
  return taskModuleModel
    .find({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deleteTaskModule = async (
  taskModuleId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return taskModuleModel.findByIdAndUpdate(
    taskModuleId,
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

export const changeTaskModuleStatus = async (
  id: string,
  updatedData: Partial<taskModuleDocument>,
) => {
  return taskModuleModel.findByIdAndUpdate(
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