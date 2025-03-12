import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';
import { industryDocument } from '../lookups-models/industry.model';

export interface recruitmentPostModel extends baseDocument {
  code: string;
  name: string;
  industry: mongoose.Types.ObjectId | industryDocument;
  priority: string;
  recruitmentPost: string;
  recruitmentPosition: string;
  recruitmentLocation: string;
  recruitmentSalary: string;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  recruitmentContactPerson: string;
  recruitmentContactNumber: string;
  recruitmentEmail: string;
  nameAlias: string;
}

export type recruitmentPostDocument = recruitmentPostModel & Document;

const recruitmentPostSchema: Schema<recruitmentPostDocument> = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  industry: { type: Schema.Types.ObjectId, ref: 'industry', required: true },
  priority: { type: String },
  recruitmentPost: { type: String },
  recruitmentPosition: { type: String },
  recruitmentLocation: { type: String },
  recruitmentSalary: { type: String },
  recruitmentStartDate: { type: Date },
  recruitmentEndDate: { type: Date },
  recruitmentContactPerson: { type: String },
  recruitmentContactNumber: { type: String },
  recruitmentEmail: { type: String },
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

recruitmentPostSchema.add(baseSchema);

export default mongoose.model<recruitmentPostDocument>(
  'recruitmentPost',
  recruitmentPostSchema,
);
