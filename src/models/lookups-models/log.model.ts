import mongoose, { Schema, Document } from 'mongoose';

export interface UserLogDocument extends Document {
  userId: mongoose.Types.ObjectId;
  module: string;
  action: string;
  actionId: mongoose.Types.ObjectId;
  description: string;
  timestamp: Date;
}

const UserLogSchema = new Schema<UserLogDocument>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'customer' },
  module: { type: String, required: true },
  action: { type: String, required: true },
  actionId: { type: Schema.Types.ObjectId, required: true, ref: 'customer' },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const UserLog = mongoose.model<UserLogDocument>('UserLog', UserLogSchema);

export default UserLog;
