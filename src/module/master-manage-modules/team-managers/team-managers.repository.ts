import mongoose from 'mongoose';
import customerModel, {
  customerDocument,
} from '@models/master-manage-modules-models/customer.models';

export const createTeamManagerRepository = async (
  teamManagerData: Partial<customerDocument>,
): Promise<customerDocument> => {
  const user = new customerModel(teamManagerData);
  return await user.save();
};

export const findByEmail = async (
  email: string,
): Promise<customerDocument | null> => {
  return customerModel.findOne({ email }).exec();
};

export const isPhoneNumberExists = async (phone: string) => {
  return customerModel.findOne({ phone }).exec();
};

// Team Manager Name is Existing
export const isTeamManagerNameExists = async (name: string) => {
  return customerModel.findOne({ name }).exec();
};

export const isNameExists = async (name: string, idToExclude?: string) => {
  const filter: any = {
    name: name,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await customerModel.findOne(filter).exec();
};

export const isEmailExists = async (email: string) => {
  return customerModel.findOne({ email }).exec();
};

export const findTeamManagerById = async (
  teamManagerId: string,
): Promise<customerDocument | null> => {
  return customerModel
    .findById(teamManagerId)
    .where({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .populate('deletedBy', 'name email')
    .exec();
};

export const updateTeamManager = async (
  teamManagerId: string,
  teamManagerData: Partial<customerDocument>,
): Promise<customerDocument | null> => {
  return customerModel.findByIdAndUpdate(
    teamManagerId,
    { $set: teamManagerData },
    { new: true, runValidators: true },
  );
};

export const deleteTeamManager = async (
  teamManagerId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<customerDocument | null> => {
  return customerModel.findByIdAndUpdate(
    teamManagerId,
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

export const getAllTeamManagers = async (): Promise<customerDocument[]> => {
  return customerModel
    .find({ isDeleted: false, role: 'team-managers' })  // Make sure 'team-managers' matches your system role
    .sort({ createdAt: -1 });
};

export const changeTeamManagerStatus = async (
  id: string,
  updatedData: Partial<customerDocument>,
): Promise<customerDocument | null> => {
  return customerModel.findByIdAndUpdate(
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
