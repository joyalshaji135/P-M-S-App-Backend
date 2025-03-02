import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';

export interface modelNameModel extends baseDocument {
  code: string;
  name: string;
}

export type modelNameDocument = modelNameModel & Document;

const modelNameSchema: Schema<modelNameDocument> = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true, unique: true },
});

modelNameSchema.add(baseSchema);

export default mongoose.model<modelNameDocument>('industry', modelNameSchema);
