import mongoose, { Schema, Document } from 'mongoose';
import {
  superAdminBaseDocument,
  superAdminBaseSchema,
} from './superAdminBaseModel';

export interface industryModel extends superAdminBaseDocument {
  code: string;
  name: string;
  nameAlias: string;
  isDefault: boolean;
}

export type industryDocument = industryModel & Document;

const industrySchema: Schema<industryDocument> = new Schema({
  code: { type: String, required: true },

  name: { type: String, required: true, unique: true },
  isDefault: { type: Boolean, default: false },

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

industrySchema.add(superAdminBaseSchema);

export default mongoose.model<industryDocument>('industry', industrySchema);
