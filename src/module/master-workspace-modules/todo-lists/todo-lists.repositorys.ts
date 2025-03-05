import mongoose from 'mongoose';
import todoListsModel, {
  todoListsDocument,
} from '@models/master-workspace-modules-models/todo-lists.models';

export const create = async (
  todoListData: Partial<todoListsDocument>,
): Promise<todoListsDocument> => {
  const todoList = new todoListsModel(todoListData);
  return await todoList.save();
};

export const isNameExists = async (title: string, idToExclude?: string) => {
  const filter: any = {
    titleName: title,
    isDeleted: false,
  }

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) }
  }

  return await todoListsModel.findOne(filter).exec();
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

  return await todoListsModel.findOne(filter).exec();
};

export const isTitleExists = async (title: string, idToExclude?: string) => {
  const filter: any = {
    title: title,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await todoListsModel.findOne(filter).exec();
};

export const findById = async (
  id: string,
): Promise<todoListsDocument | null> => {
  return todoListsModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<todoListsDocument>,
): Promise<todoListsDocument | null> => {
  return todoListsModel
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

export const getAllTodoLists = async () => {
  return todoListsModel
    .find({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deleteTodoList = async (
  todoListId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return todoListsModel.findByIdAndUpdate(
    todoListId,
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

export const changeTodoListStatus = async (
  id: string,
  updatedData: Partial<todoListsDocument>,
) => {
  return todoListsModel.findByIdAndUpdate(
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
