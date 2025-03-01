import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from './base.model';

export interface LookupCodes extends baseDocument {
  type: string;
  name: string;
  code: string;
  firstNumber: number;
  lastNumber: number;
  createdBy: mongoose.Types.ObjectId;
}

export type LookupCodeDocument = LookupCodes & Document;

const LookupCodeSchema: Schema<LookupCodes> = new Schema(
  {
    type: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    firstNumber: { type: Number, required: true },
    lastNumber: { type: Number, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'superAdmin',
      required: true,
    },
  },
  { timestamps: true },
);
LookupCodeSchema.add(baseSchema);
export default mongoose.model<LookupCodeDocument>(
  'LookupCodes',
  LookupCodeSchema,
);
