import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';
import { customerDocument } from '../master-manage-modules-models/customer.models';
import { industryProjectDocument } from './industry-projects.models';

export interface taskRoleModel extends baseDocument {
  code: string;
  taskName: string;
  resourceName: mongoose.Types.ObjectId | customerDocument;
  project: mongoose.Types.ObjectId | industryProjectDocument;
  taskModule: string;
  startDate: Date;
  endDate: Date;
  taskTitle: string;
  taskDescription: string;
  taskHours: string;
  taskTakenTime: string;
  percentageOfCompleted: number;
  taskStatus: string;
  nameAlias: string;
}

export type taskRoleDocument = taskRoleModel & Document;

const customerTypeSchema: Schema<taskRoleDocument> = new Schema({
  code: { type: String, required: true },
  taskName: { type: String, required: true, unique: true },
  resourceName: {
    type: Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'industryProject',
    required: true,
  },
  //   taskModule: { type: Schema.Types.ObjectId, ref: 'taskModule', required: true },
  taskModule: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  taskTitle: { type: String, required: true },
  taskDescription: { type: String, required: true },
  taskHours: { type: String, required: true },
  taskTakenTime: { type: String, required: true },
  percentageOfCompleted: { type: Number, required: true },
  taskStatus: { type: String, required: true },
  nameAlias: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    validate: {
      validator: (v: string) => /^[a-z0-9\-]+$/.test(v),
      message:
        'nameAlias must be lowercase, without spaces, and can include hyphens!',
    },
  },
});

customerTypeSchema.add(baseSchema);

export default mongoose.model<taskRoleDocument>(
  'customerType',
  customerTypeSchema,
);
