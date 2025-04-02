import mongoose from 'mongoose';
import industryProjectModel, {
  industryProjectDocument,
} from '@models/master-workspace-modules-models/industry-projects.models';

export const create = async (
  industryProjectData: Partial<industryProjectDocument>,
): Promise<industryProjectDocument> => {
  const industryProject = new industryProjectModel(industryProjectData);
  return await industryProject.save();
};

export const isNameExists = async (
  projectName: string,
  idToExclude?: string,
) => {
  const filter: any = {
    projectName: projectName,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await industryProjectModel.findOne(filter).exec();
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

  return await industryProjectModel.findOne(filter).exec();
};

export const findById = async (
  id: string,
): Promise<industryProjectDocument | null> => {
  return industryProjectModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('customer', 'name email role phone')
    .populate('industry', 'name code')
    .populate('priority', 'name code')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<industryProjectDocument>,
): Promise<industryProjectDocument | null> => {
  return industryProjectModel
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
    .populate('customer', 'name email role phone')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

export const getAllIndustryProjects = async () => {
  return industryProjectModel
    .find({ isDeleted: false })
    .populate('customer', 'name email role phone')
    .populate('industry', 'name code')
    .populate('priority', 'name code')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

export const deleteIndustryProject = async (
  industryProjectId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return industryProjectModel.findByIdAndUpdate(
    industryProjectId,
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

export const changeIndustryProjectStatus = async (
  id: string,
  updatedData: Partial<industryProjectDocument>,
) => {
  return industryProjectModel.findByIdAndUpdate(
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
