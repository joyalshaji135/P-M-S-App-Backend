import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from './base.model';

export interface domainModel extends baseDocument {
  code: string;
  name: string;
  nameAlias: string;
}

export type domainDocument = domainModel & Document;

const domainSchema: Schema<domainDocument> = new Schema({
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

domainSchema.add(baseSchema);

export default mongoose.model<domainDocument>('domain', domainSchema);
