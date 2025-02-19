import mongoose from "mongoose";
import LookupCode, {
  LookupCodeDocument,
} from "../../../model/lookups/lookupCodeModel";

export const createLookupCode = async (
  lookupCodeData: Partial<LookupCodeDocument>,
): Promise<LookupCodeDocument> => {
  const existingLookupCode = await LookupCode.findOne({
    $or: [
      { type: lookupCodeData.type },
      { name: lookupCodeData.name },
      { code: lookupCodeData.code },
    ],
  });

  if (existingLookupCode) {
    throw new Error(
      "A LookupCode with the same type, name, or code already exists.",
    );
  }
  const lookupCode = new LookupCode(lookupCodeData);
  return await lookupCode.save();
};

export const getAllLookupCodes = async (): Promise<LookupCodeDocument[]> => {
  return await LookupCode.find({ isDeleted: false }).sort({ createdAt: -1 })
    .where({ isDeleted: false })
    .populate("createdBy", "name email")
    .populate("userUpdatedBy", "name email")
    .populate("deletedBy", "name email")
    .exec();
};

export const findLookupCodeById = async (
  lookupCodeId: string,
): Promise<LookupCodeDocument | null> => {
  return await LookupCode.findById(lookupCodeId, { isDeleted: false })
  .where({ isDeleted: false })
  .populate("createdBy", "name email")
  .populate("userUpdatedBy", "name email")
  .populate("deletedBy", "name email")
  .exec();
};

export const updateLookupCode = async (
  lookupCodeId: string,
  lookupCodeData: Partial<LookupCodeDocument>,
): Promise<LookupCodeDocument | null> => {
  return await LookupCode.findByIdAndUpdate(
    lookupCodeId,
    { $set: lookupCodeData },
    { new: true, runValidators: true },
  );
};

export const findLookupCodeByType = async (lookupType: string) => {
  return await LookupCode.findOne({ type: lookupType });
};

export const changeLookupCodeStatus = async (
  id: string,
  updatedData: Partial<LookupCodeDocument>,
): Promise<LookupCodeDocument | null> => {
  return LookupCode.findByIdAndUpdate(
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

export const deleteLookupCode = async (
  lookupCodeId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<LookupCodeDocument | null> => {
  return await LookupCode.findByIdAndUpdate(
    lookupCodeId,
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
