import mongoose from 'mongoose';
import clientFeedbackModel, {
  clientFeedbackDocument,
} from '@models/master-workspace-modules-models/clients-feedbacks.models'; // Adjust the import path as needed

// Create a new client feedback entry
export const createClientFeedback = async (
  feedbackData: Partial<clientFeedbackDocument>,
): Promise<clientFeedbackDocument> => {
  const feedback = new clientFeedbackModel(feedbackData);
  return await feedback.save();
};

// Check if a feedback code already exists (excluding a specific ID if provided)
export const isFeedbackCodeExists = async (code: string, idToExclude?: string) => {
  const filter: any = {
    code: code,
    isDeleted: false,
  };

  if (idToExclude) {
    filter._id = { $ne: new mongoose.Types.ObjectId(idToExclude) };
  }

  return await clientFeedbackModel.findOne(filter).exec();
};

// Find a client feedback entry by ID
export const findClientFeedbackById = async (
  id: string,
): Promise<clientFeedbackDocument | null> => {
  return clientFeedbackModel
    .findById(id)
    .where({ isDeleted: false })
    .populate('customer', 'name email') // Assuming customer has 'name' and 'email' fields
    .populate('industryProject', 'name code') // Assuming industryProject has 'name' and 'code' fields
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

// Update a client feedback entry by ID
export const updateClientFeedbackById = async (
  id: string,
  updateData: Partial<clientFeedbackDocument>,
): Promise<clientFeedbackDocument | null> => {
  return clientFeedbackModel
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
    .populate('industryProject', 'name code')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};

// Get all client feedback entries (non-deleted)
export const getAllClientFeedbacks = async () => {
  return clientFeedbackModel
    .find({ isDeleted: false })
    .populate('customer', 'name email')
    .populate('industryProject', 'name code')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .sort({ createdAt: -1 });
};

// Soft delete a client feedback entry
export const deleteClientFeedback = async (
  feedbackId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  return clientFeedbackModel.findByIdAndUpdate(
    feedbackId,
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

// Change the status of a client feedback entry
export const changeClientFeedbackStatus = async (
  id: string,
  updatedData: Partial<clientFeedbackDocument>,
) => {
  return clientFeedbackModel.findByIdAndUpdate(
    id,
    {
      $set: {
        feedbackStatus: updatedData.feedbackStatus,
        userUpdatedBy: updatedData.userUpdatedBy,
        userUpdatedDate: updatedData.userUpdatedDate,
      },
    },
    { new: true, runValidators: true },
  );
};