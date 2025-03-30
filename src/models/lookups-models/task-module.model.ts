import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from './base.model';

export interface taskModuleModel extends baseDocument {
  code: string;
  name: string;
  nameAlias: string;
}

export type taskModuleDocument = taskModuleModel & Document;

const taskModuleSchema: Schema<taskModuleDocument> = new Schema({
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

taskModuleSchema.add(baseSchema);

export default mongoose.model<taskModuleDocument>(
  'taskModule',
  taskModuleSchema,
);
