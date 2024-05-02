import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { BinModel } from '../db/models/bin';
import { RequestModel } from '../db/models/request';

export async function addRequest(binId: string, req: Request) {
  const requestId = uuidv4();

  const bin = await BinModel.findOne({ bin_id: binId });

  if (!bin) {
    throw new Error('Bin not found');
  }

  const newRequest = new RequestModel({
    bin: bin._id, // Reference to the Bin document
    request_id: requestId,
    headers: {
      accept: req.get('Accept'),
      content_length: req.get('Content-Length'),
      content_type: req.get('Content-Type'),
      host: req.get('Host'),
      user_agent: req.get('User-Agent')
    },
    method: req.method,
    path: req.path,
    data: {
      headers: req.headers,
      body: req.body,
    },
  });

  await newRequest.save();

  return { request: newRequest };
}

export function clearRequests() {
  return RequestModel.deleteMany({});
}
