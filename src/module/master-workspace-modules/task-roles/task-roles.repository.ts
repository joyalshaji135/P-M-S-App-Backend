import mongoose from 'mongoose';
import taskRoleModel, {
  taskRoleDocument,
} from '@models/master-workspace-modules-models/task-role.models';

export const create = async (
  taskRoleData: Partial<taskRoleDocument>,
): Promise<taskRoleDocument> => {
  const taskRole = new taskRoleModel(taskRoleData);
  return await taskRole.save();
};

export const isNameExists = async (
  taskRoleName: string,
  idToExclude?: string,
) => {
  const filter: any = {
    taskRoleName: taskRoleName,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await taskRoleModel.findOne(filter).exec();
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

  return await taskRoleModel.findOne(filter).exec();
};

export const findById = async (
  id: string,
): Promise<taskRoleDocument | null> => {
  return taskRoleModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('resourceName', 'name email role phone')
    .populate('project', 'projectName industry description projectStatus')
    .populate('taskModule', 'name code')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<taskRoleDocument>,
): Promise<taskRoleDocument | null> => {
  return taskRoleModel
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

export const getAllTaskRoles = async () => {
  return taskRoleModel
    .find({ isDeleted: false })
    .populate('resourceName', 'name email role phone')
    .populate('taskModule', 'name code')
    .populate('project', 'projectName industry description projectStatus')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deleteTaskRole = async (
  taskRoleId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return taskRoleModel.findByIdAndUpdate(
    taskRoleId,
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

export const changeTaskRoleStatus = async (
  id: string,
  updatedData: Partial<taskRoleDocument>,
) => {
  return taskRoleModel.findByIdAndUpdate(
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
