import mongoose from 'mongoose';
import googleMeetModel, {
  googleMeetDocument,
} from '@models/feature-manage-modules-models/google-meets.models';

export const create = async (
  googleMeetData: Partial<googleMeetDocument>,
): Promise<googleMeetDocument> => {
  const googleMeet = new googleMeetModel(googleMeetData);
  return await googleMeet.save();
};

export const isNameExists = async (name: string, idToExclude?: string) => {
  const filter: any = {
    name: name,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await googleMeetModel.findOne(filter).exec();
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

  return await googleMeetModel.findOne(filter).exec();
};

export const findById = async (
  id: string,
): Promise<googleMeetDocument | null> => {
  return googleMeetModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<googleMeetDocument>,
): Promise<googleMeetDocument | null> => {
  return googleMeetModel
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

export const getAllGoogleMeets = async () => {
  return googleMeetModel
    .find({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deleteGoogleMeet = async (
  googleMeetId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return googleMeetModel.findByIdAndUpdate(
    googleMeetId,
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

export const changeGoogleMeetStatus = async (
  id: string,
  updatedData: Partial<googleMeetDocument>,
) => {
  return googleMeetModel.findByIdAndUpdate(
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