import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';

export interface todoListsModel extends baseDocument {
  code: string;
  titleName: string;
  description: string;
  dueDate: Date;
  priority: string;
}

export type todoListsDocument = todoListsModel & Document;

const todoListsSchema: Schema<todoListsDocument> = new Schema({
  code: { type: String, required: true },
  titleName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
});

todoListsSchema.add(baseSchema);

export default mongoose.model<todoListsDocument>('todoLists', todoListsSchema);
