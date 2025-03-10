import mongoose from 'mongoose';
import recruitmentPostModel, {
  recruitmentPostDocument,
} from '@models/feature-manage-modules-models/recruitment-posts.models';

export const create = async (
  recruitmentPostData: Partial<recruitmentPostDocument>,
): Promise<recruitmentPostDocument> => {
  const recruitmentPost = new recruitmentPostModel(recruitmentPostData);
  return await recruitmentPost.save();
};

export const isNameExists = async (name: string, idToExclude?: string) => {
  const filter: any = {
    name: name,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await recruitmentPostModel.findOne(filter).exec();
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

  return await recruitmentPostModel.findOne(filter).exec();
};

export const findById = async (
  id: string,
): Promise<recruitmentPostDocument | null> => {
  return recruitmentPostModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<recruitmentPostDocument>,
): Promise<recruitmentPostDocument | null> => {
  return recruitmentPostModel
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

export const getAllRecruitmentPosts = async () => {
  return recruitmentPostModel
    .find({ isDeleted: false })
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deleteRecruitmentPost = async (
  recruitmentPostId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return recruitmentPostModel.findByIdAndUpdate(
    recruitmentPostId,
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

export const changeRecruitmentPostStatus = async (
  id: string,
  updatedData: Partial<recruitmentPostDocument>,
) => {
  return recruitmentPostModel.findByIdAndUpdate(
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