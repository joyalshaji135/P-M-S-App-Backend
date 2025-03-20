import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';

// Address Interface
interface Address {
  street: string;
  city: string;
  state: string;
  district: string;
  zipCode: string;
}

// Skill Interface
interface Skill {
  skillName: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
  certification?: string;
}

// Customer Model Interface
export interface customerModel extends baseDocument {
  name: string;
  email: string;
  phone: string;
  role: string;
  address: Address;
  password: string;
  isDefault: boolean;
  skills: Skill[]; // Array of skills
  dateOfBirth?: Date;
  gender?: string;
  profilePicture?: string;
  lastLogin?: Date;
  preferences?: {
    newsletter: boolean;
    notifications: boolean;
  };
  company: {
    name: string;
    registrationNumber: string;
    address: Address;
    website: string;
    email: string;
    phone: string;
    industry: string;
  };
}

export type customerDocument = customerModel & Document;

// Skill Schema
const skillSchema = new Schema<Skill>({
  skillName: { type: String, required: false },
  proficiency: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: false,
  },
  yearsOfExperience: { type: Number, required: false },
  certification: { type: String },
});

// Customer Schema
const customerSchema: Schema<customerModel> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'company-owners', 'team-managers', 'team-members'],
  },
  password: { type: String },
  isDefault: { type: Boolean, default: false },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  profilePicture: { type: String },
  lastLogin: { type: Date },
  preferences: {
    newsletter: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true },
  },

  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    zipCode: { type: String, required: true },
  },

  // Array of skills
  skills: [skillSchema],

  company: {
    name: { type: String, required: false },
    registrationNumber: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    industry: { type: String, required: false },
    website: { type: String, required: false },
  },
});

// Add base schema fields (like createdBy, updatedBy, etc.)
customerSchema.add(baseSchema);

export default mongoose.model<customerDocument>('customer', customerSchema);

//  Json Format for customer
// {
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "phone": "1234567890",
//     "role": "customer",
//     "password": "securepassword",
//     "isDefault": false,
//     "dateOfBirth": "1990-01-01T00:00:00.000Z",
//     "gender": "male",
//     "profilePicture": "https://example.com/profile.jpg",
//     "status": "active",
//     "lastLogin": "2023-10-01T12:34:56.000Z",
//     "preferences": {
//       "newsletter": true,
//       "notifications": false
//     },
//     "address": {
//       "street": "123 Main St",
//       "city": "New York",
//       "state": "NY",
//       "district": "Manhattan",
//       "zipCode": "10001"
//     }
//   }
