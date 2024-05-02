import { Schema, model, Document } from 'mongoose';
import { IBin } from './interfaces';

const BinSchema = new Schema<IBin>({
  bin_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

BinSchema.virtual('requests', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'bin',
  justOne: false,
});

BinSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // don't reveal internal db ID's to the public
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const BinModel = model<IBin>('Bin', BinSchema);
