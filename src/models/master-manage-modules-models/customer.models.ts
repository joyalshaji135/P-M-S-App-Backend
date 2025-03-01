import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';

interface Address {
  street: string;
  city: string;
  state: string;
  district: string;
  zipCode: string;
}

export interface customerModel extends baseDocument {
  name: string;
  email: string;
  phone: string;
  role: string;
  address: Address;
  password: string;
  isDefault: boolean;
  dateOfBirth?: Date;
  gender?: string;
  profilePicture?: string;
  lastLogin?: Date;
  preferences?: {
    newsletter: boolean;
    notifications: boolean;
  };
}

export type customerDocument = customerModel & Document;

const customerSchema: Schema<customerModel> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, ref: 'Role', default: 'admin' }, // Default role set to 'admin'
  password: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
  dateOfBirth: { type: Date }, // Optional field
  gender: { type: String, enum: ['male', 'female', 'other'] }, // Optional field with enum values
  profilePicture: { type: String }, // Optional field for profile picture URL
  lastLogin: { type: Date }, // Optional field for tracking last login date
  preferences: {
    newsletter: { type: Boolean, default: false }, // Default to false
    notifications: { type: Boolean, default: true }, // Default to true
  },

  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
});

// Add base schema fields (if any)
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
