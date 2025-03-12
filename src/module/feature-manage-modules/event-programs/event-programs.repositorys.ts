import mongoose from 'mongoose';
import eventProgramsModel, {
  eventProgramsDocument,
} from '@models/feature-manage-modules-models/event-programs.models';

export const create = async (
  eventProgramsData: Partial<eventProgramsDocument>,
): Promise<eventProgramsDocument> => {
  const eventPrograms = new eventProgramsModel(eventProgramsData);
  return await eventPrograms.save();
};

export const isNameExists = async (name: string, idToExclude?: string) => {
  const filter: any = {
    name: name,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await eventProgramsModel.findOne(filter).exec();
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

  return await eventProgramsModel.findOne(filter).exec();
};

export const findById = async (
  id: string,
): Promise<eventProgramsDocument | null> => {
  return eventProgramsModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<eventProgramsDocument>,
): Promise<eventProgramsDocument | null> => {
  return eventProgramsModel
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

export const getAllEventPrograms = async () => {
  return eventProgramsModel
    .find({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deleteEventProgram = async (
  eventProgramId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return eventProgramsModel.findByIdAndUpdate(
    eventProgramId,
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

export const changeEventProgramStatus = async (
  id: string,
  updatedData: Partial<eventProgramsDocument>,
) => {
  return eventProgramsModel.findByIdAndUpdate(
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
