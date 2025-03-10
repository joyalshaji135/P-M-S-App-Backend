import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';
import { industryProjectDocument } from '../master-workspace-modules-models/industry-projects.models';
import { customerDocument } from '../master-manage-modules-models/customer.models';

export interface googleMeetModel extends baseDocument {
  code: string;
  name: string;
  description: string;
  industryProject: mongoose.Types.ObjectId | industryProjectDocument;
  customer: mongoose.Types.ObjectId | customerDocument;
  meetingDate: Date;
  meetingTime: string;
  meetingLink: string;
  meetingStatus: string;
  nameAlias: string;
}

export type googleMeetDocument = googleMeetModel & Document;

const googleMeetSchema: Schema<googleMeetDocument> = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  industryProject: { type: Schema.Types.ObjectId, ref: 'industryProject', required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'customer', required: true },
  meetingDate: { type: Date },
  meetingTime: { type: String },
  meetingLink: { type: String },
  meetingStatus: { type: String },
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

googleMeetSchema.add(baseSchema);

export default mongoose.model<googleMeetDocument>('googleMeet', googleMeetSchema);
