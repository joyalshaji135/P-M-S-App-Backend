import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from './base.model';

export interface industryModel extends baseDocument {
  code: string;
  name: string;
  nameAlias: string;
}

export type industryDocument = industryModel & Document;

const industrySchema: Schema<industryDocument> = new Schema({
  code: { type: String, required: true },

  name: { type: String, required: true, unique: true },

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

industrySchema.add(baseSchema);

export default mongoose.model<industryDocument>('industry', industrySchema);
