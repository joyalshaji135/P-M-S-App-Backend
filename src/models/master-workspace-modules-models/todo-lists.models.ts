import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';

export interface todoListsModel extends baseDocument {
  code: string;
  titleName: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  priority: string;
  nameAlias: string;
}

export type todoListsDocument = todoListsModel & Document;

const todoListsSchema: Schema<todoListsDocument> = new Schema({
  code: { type: String, required: true },
  titleName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
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

todoListsSchema.add(baseSchema);

export default mongoose.model<todoListsDocument>('todoLists', todoListsSchema);
