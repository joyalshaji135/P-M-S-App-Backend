import mongoose, { Schema, Document } from "mongoose";
import { customerDocument } from "../Customers/customizeCustomerModel";

export interface BaseDocument extends Document {
  status: boolean;
  isDeleted: boolean;
  userUpdatedDate: Date;
  updatedBy: mongoose.Types.ObjectId | customerDocument;
  createdBy: mongoose.Types.ObjectId | customerDocument;
  deletedBy: mongoose.Types.ObjectId | customerDocument;
  deletedAt: Date;
  createdAt: Date;
}

export const BaseSchema = new Schema<BaseDocument>(
  {
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "customer" },
    userUpdatedDate: { type: Date },
    updatedBy: { type: Schema.Types.ObjectId, ref: "customer" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "customer" },
    deletedAt: { type: Date },
    createdAt: { type: Date },
  },
  { timestamps: true },
);
