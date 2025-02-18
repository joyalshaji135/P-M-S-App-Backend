import mongoose, { Schema, Document } from 'mongoose';
import {
  superAdminBaseDocument,
  superAdminBaseSchema,
} from '../lookups/superAdminBaseModel';

interface Address {
  street: string;
  city: string;
  state: string;
  district: string;
  zipCode: string;
}

export interface superAdminModel extends superAdminBaseDocument {
  name: string;
  email: string;
  phone: string;
  role: string;
  address: Address;
  password: string;
  isDefault: boolean;
}

export type superAdminDocument = superAdminModel & Document;

const superAdminSchema: Schema<superAdminModel> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, ref: 'Role', default: 'admin' }, // Default role set to 'admin'
  password: { type: String, required: true },
  isDefault: { type: Boolean, default: false },

  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
});
superAdminSchema.add(superAdminBaseSchema);

export default mongoose.model<superAdminDocument>(
  'superAdmin',
  superAdminSchema,
);
