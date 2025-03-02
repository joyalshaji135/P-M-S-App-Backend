import mongoose, { Schema, Document } from 'mongoose';
import { baseDocument, baseSchema } from '../lookups-models/base.model';
import { customerDocument } from '../master-manage-modules-models/customer.models';

export interface alertModeModel extends baseDocument {
  code: string;
  message: string;
  customer: Schema.Types.ObjectId | customerDocument;
  severity: string;
  alertStatus: boolean;
  triggeredAt: Date;
}

export type alertModeDocument = alertModeModel & Document;

const alertModeSchema: Schema<alertModeDocument> = new Schema({
  code: { type: String, required: true },
  message: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref:'customer', required: true },
  severity: { type: String, required: true },
  alertStatus: { type: Boolean, required: true },
  triggeredAt: { type: Date, required: true }
});

alertModeSchema.add(baseSchema);

export default mongoose.model<alertModeDocument>('alertMode', alertModeSchema);
