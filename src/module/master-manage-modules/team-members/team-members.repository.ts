import mongoose from 'mongoose';
import customerModel, {
  customerDocument,
} from '@models/master-manage-modules-models/customer.models';

export const createTeamMemberRepository = async (
  teamMemberData: Partial<customerDocument>,
): Promise<customerDocument> => {
  const user = new customerModel(teamMemberData);
  return await user.save();
};

export const findByEmail = async (
  email: string,
): Promise<customerDocument | null> => {
  return customerModel.findOne({ email, role: 'team-member' }).exec();
};

export const isPhoneNumberExists = async (phone: string) => {
  return customerModel.findOne({ phone, role: 'team-members' }).exec();
};

// Team Member Name is Existing
export const isTeamMemberNameExists = async (name: string) => {
  return customerModel.findOne({ name, role: 'team-members' }).exec();
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

export const findTeamMemberById = async (
  teamMemberId: string,
): Promise<customerDocument | null> => {
  return customerModel
    .findById(teamMemberId)
    .where({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .populate('deletedBy', 'name email')
    .exec();
};

export const updateTeamMember = async (
  teamMemberId: string,
  teamMemberData: Partial<customerDocument>,
): Promise<customerDocument | null> => {
  return customerModel.findByIdAndUpdate(
    teamMemberId,
    { $set: teamMemberData },
    { new: true, runValidators: true },
  );
};

export const deleteTeamMember = async (
  teamMemberId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<customerDocument | null> => {
  return customerModel.findByIdAndUpdate(
    teamMemberId,
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

export const getAllTeamMembers = async (): Promise<customerDocument[]> => {
  return customerModel
    .find({ isDeleted: false, role: 'team-members' })  // Make sure 'team-members' matches your system role
    .sort({ createdAt: -1 });
};

export const changeTeamMemberStatus = async (
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
