import mongoose, { Schema, Document } from 'mongoose';
import { customerDocument } from '../master-manage-modules-models/customer.models';

export interface baseDocument extends Document {
  status: string;
  isDeleted: boolean;
  userUpdatedDate: Date;
  userUpdatedBy: mongoose.Types.ObjectId | customerDocument;
  createdBy: mongoose.Types.ObjectId | customerDocument;
  updatedBy: mongoose.Types.ObjectId | customerDocument;
  deletedBy: mongoose.Types.ObjectId | customerDocument;
  deletedAt: Date;
  isDefault: boolean;
}

export const baseSchema = new Schema<baseDocument>(
  {
    status: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'customer' },
    userUpdatedDate: { type: Date },
    userUpdatedBy: { type: Schema.Types.ObjectId, ref: 'customer' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'customer' },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'customer' },
    deletedAt: { type: Date },
    isDefault: { type: Boolean, default: true },
  },
  { timestamps: true },
);
