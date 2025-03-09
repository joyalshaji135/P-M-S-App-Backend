import mongoose from 'mongoose';
import alertModeModel, {
  alertModeDocument,
} from '@models/master-workspace-modules-models/alert-mode.models'; 

export const createAlertMode = async (
  alertModeData: Partial<alertModeDocument>,
): Promise<alertModeDocument> => {
  const alertMode = new alertModeModel(alertModeData);
  return await alertMode.save();
};

export const isCodeExists = async (code: string, idToExclude?: string) => {
  const filter: any = {
    code: code,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await alertModeModel.findOne(filter).exec();
};

export const findAlertModeById = async (
  id: string,
): Promise<alertModeDocument | null> => {
  return alertModeModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('customer', 'name email') // Assuming customer has 'name' and 'email' fields
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateAlertModeById = async (
  id: string,
  updateData: Partial<alertModeDocument>,
): Promise<alertModeDocument | null> => {
  return alertModeModel
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
    .populate('customer', 'name email')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const getAllAlertModes = async () => {
  return alertModeModel
    .find({ isDeleted: false })
    .populate('customer', 'name email')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deleteAlertMode = async (
  alertModeId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return alertModeModel.findByIdAndUpdate(
    alertModeId,
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

export const changeAlertModeStatus = async (
  id: string,
  updatedData: Partial<alertModeDocument>,
) => {
  return alertModeModel.findByIdAndUpdate(
    id,
    {
      $set: {
        alertStatus: updatedData.alertStatus,
        userUpdatedBy: updatedData.userUpdatedBy,
        userUpdatedDate: updatedData.userUpdatedDate,
      },
    },
    { new: true, runValidators: true },
  );
};