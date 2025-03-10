import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';
import { industryDocument } from '../lookups-models/industry.model';

export interface eventProgramsModel extends baseDocument {
  code: string;
  name: string;
  description: string;
  industry: mongoose.Types.ObjectId | industryDocument;
  priority: string;
  eventPost: string;
  Domain: string;
  nameAlias: string;
}

export type eventProgramsDocument = eventProgramsModel & Document;

const eventProgramsSchema: Schema<eventProgramsDocument> = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  industry: { type: Schema.Types.ObjectId, ref: 'industry' },
  priority: { type: String },
  eventPost: { type: String },
  Domain: { type: String },
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

eventProgramsSchema.add(baseSchema);

export default mongoose.model<eventProgramsDocument>('eventPrograms', eventProgramsSchema);
