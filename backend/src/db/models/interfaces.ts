import { Document, Types } from 'mongoose';

export interface IBin extends Document {
  bin_id: string;
  name: string;
  requests?: IRequest[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRequest extends Document {
  bin: Types.ObjectId;
  request_id: string;
  headers: {
    accept: string;
    content_length: string;
    content_type: string;
    host: string;
    user_agent: string;
  };
  method: string;
  path: string;
  data: any;
  createdAt: Date;
  updatedAt: Date;
}
