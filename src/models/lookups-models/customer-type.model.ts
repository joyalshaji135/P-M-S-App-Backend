import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from './base.model';

export interface customerTypeModel extends baseDocument {
  code: string;
  name: string;
  nameAlias: string;
  isDefault: boolean;
}

export type customerTypeDocument = customerTypeModel & Document;

const customerTypeSchema: Schema<customerTypeDocument> = new Schema({
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

customerTypeSchema.add(baseSchema);

export default mongoose.model<customerTypeDocument>(
  'customerType',
  customerTypeSchema,
);
