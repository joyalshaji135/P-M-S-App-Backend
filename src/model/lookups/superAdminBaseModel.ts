import mongoose, { Schema, Document } from 'mongoose';
import { superAdminDocument } from '../superAdmin/superAdminModel';

export interface superAdminBaseDocument extends Document {
  status: boolean;
  isDeleted: boolean;
  userUpdatedDate: Date;
  userUpdatedBy: mongoose.Types.ObjectId | superAdminDocument;
  createdBy: mongoose.Types.ObjectId | superAdminDocument;
  updatedBy: mongoose.Types.ObjectId | superAdminDocument;
  deletedBy: mongoose.Types.ObjectId | superAdminDocument;
  deletedAt: Date;
  isDefault: boolean;
}

export const superAdminBaseSchema = new Schema<superAdminBaseDocument>(
  {
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'superAdmin' },
    userUpdatedDate: { type: Date },
    userUpdatedBy: { type: Schema.Types.ObjectId, ref: 'superAdmin' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'superAdmin' },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'superAdmin' },
    deletedAt: { type: Date },
    isDefault: { type: Boolean, default: true },
  },
  { timestamps: true },
);
