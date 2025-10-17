import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';
import { customerDocument } from '../master-manage-modules-models/customer.models';
import { industryProjectDocument } from './industry-projects.models';

export interface clientFeedbackModel extends baseDocument {
  code: string;
  customer: Schema.Types.ObjectId | customerDocument;
  industryProject: Schema.Types.ObjectId | industryProjectDocument;
  rating: number;
  comment: string;
  submittedAt: Date;
  feedbackStatus: string;
}

export type clientFeedbackDocument = clientFeedbackModel & Document;

const clientFeedbackSchema: Schema<clientFeedbackDocument> = new Schema({
  code: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'customer', required: true },
  industryProject: {
    type: Schema.Types.ObjectId,
    ref: 'industryProject',
    required: true,
  },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  submittedAt: { type: Date, required: true },
  feedbackStatus: { type: String, default: 'Active' },
});

clientFeedbackSchema.add(baseSchema);

export default mongoose.model<clientFeedbackDocument>(
  'clientFeedback',
  clientFeedbackSchema,
);
