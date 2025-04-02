import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';
import { customerDocument } from '../master-manage-modules-models/customer.models';
import { industryDocument } from '../lookups-models/industry.model';
import { priorityDocument } from '../lookups-models/priority.model';

export interface industryProjectModel extends baseDocument {
  code: string;
  projectName: string;
  customer: Schema.Types.ObjectId | customerDocument;
  //   industry: Schema.Types.ObjectId | industryDocument;
  industry: mongoose.Types.ObjectId | industryDocument;
  priority: mongoose.Types.ObjectId | priorityDocument;
  description: string;
  projectStatus: string;
  startDate: Date;
  endDate: Date;
  nameAlias: string;
}

export type industryProjectDocument = industryProjectModel & Document;

const industryProjectSchema: Schema<industryProjectDocument> = new Schema({
  code: { type: String, required: true },
  projectName: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'customer', required: true },
  industry: { type: Schema.Types.ObjectId, ref: 'industry', required: true },
  priority: {  type: Schema.Types.ObjectId, ref: 'priority', required: true},
  description: { type: String, required: true },
  projectStatus: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
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

industryProjectSchema.add(baseSchema);

export default mongoose.model<industryProjectDocument>(
  'industryProject',
  industryProjectSchema,
);
