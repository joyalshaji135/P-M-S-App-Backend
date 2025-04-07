import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';

export interface contactUsModel extends baseDocument {
  code: string;
  name: string;
  email: string;
  message: string;
}

export type contactUsDocument = contactUsModel & Document;

const contactUsSchema: Schema<contactUsDocument> = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

contactUsSchema.add(baseSchema);

export default mongoose.model<contactUsDocument>('contactUs', contactUsSchema);
