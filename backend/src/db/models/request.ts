import { Schema, model, Document } from 'mongoose';
import { IRequest } from './interfaces';

const RequestSchema = new Schema<IRequest>({
  bin: {
    type: Schema.Types.ObjectId,
    ref: 'Bin',
    required: true
  },
  request_id: {
    type: String,
    required: true
  },
  headers: {
    accept: String,
    content_length: String,
    content_type: String,
    host: String,
    user_agent: String
  },
  method: {
    type: String
  },
  path: {
    type: String
  },
  data: {
    type: Object,
    required: true
  },
}, {
  timestamps: true
});

RequestSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // don't reveal internal db ID's to the public
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const RequestModel = model<IRequest>('Request', RequestSchema);
