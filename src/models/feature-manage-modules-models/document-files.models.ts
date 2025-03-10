import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';
import { industryDocument } from '../lookups-models/industry.model';

export interface documentFileModel extends baseDocument {
  code: string;
  name: string;
  description: string;
  industry: mongoose.Types.ObjectId | industryDocument;
  priority: string;
  fileDocument: string;
  nameAlias: string;
}

export type documentFileDocument = documentFileModel & Document;

const documentFileSchema: Schema<documentFileDocument> = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  industry: { type: Schema.Types.ObjectId, ref: 'industry', required: true },
  priority: { type: String },
  fileDocument: { type: String },
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

documentFileSchema.add(baseSchema);

export default mongoose.model<documentFileDocument>('documentFile', documentFileSchema);
