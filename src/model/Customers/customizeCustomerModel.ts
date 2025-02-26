import mongoose, { Schema, Document } from 'mongoose';
import { CustomerType } from '../../config/enum';
import { BaseDocument, BaseSchema } from '../lookups/customizeBaseModel';
import { customerTypeDocument } from '../lookups/customerTypeModel';

// Define an interface for the company details
interface Company {
  name: string;
  registrationNumber?: string;
  address: string;
  website?: string;
  industry: string;
}

// Define an interface for the company owner
export interface customerModel extends BaseDocument {
  code: string;
  name: string;
  customerType: Schema.Types.ObjectId | customerTypeDocument;
  email: string;
  password: string;
  phone: string;
  company: Company;
  role: string;
}

export type customerDocument = customerModel & Document;
// Define the schema
const customerSchema: Schema<customerDocument> = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    // Add Customer Type
    customerType: { type: Schema.Types.ObjectId, ref: 'customerType' },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, // Should be hashed before saving
    phone: { type: String, required: true, unique: true },
    company: {
      name: { type: String, required: true },
      registrationNumber: { type: String, unique: true },
      address: { type: String, required: true },
      website: { type: String },
      industry: { type: String, required: true },
    },
    role: {
      type: String,
      required: true,
      enum: CustomerType,
      default: 'unknown',
    },
  },
  { timestamps: true },
);

customerSchema.add(BaseSchema);

// Create and export the model
export default mongoose.model<customerDocument>('customer', customerSchema);
