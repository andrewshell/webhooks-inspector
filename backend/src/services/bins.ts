import { BinModel } from '../db/models/bin';
import { RequestModel } from '../db/models/request';
import { IRequest } from '../db/models/interfaces';
import { v4 as uuidv4 } from 'uuid';

export async function getBinWithRequests(binId: string) {
  const bin = await BinModel
    .findOne({ bin_id: binId })
    .populate({
      path: 'requests',
      options: { sort: { 'createdAt': -1 } }
    }).exec();

  if (!bin) return null;

  const { bin_id, name } = bin;

  const requestsMetadata = bin.requests ? bin.requests.map(request => {
    const { _id, bin, __v, ...rest } = request.toObject();
    return rest;
  }) : [];

  return {
    bin_id,
    name,
    requests: requestsMetadata
  };
}

export async function createBin(name = 'My Bin') {
  const binId = uuidv4();

  const bin = new BinModel({
    bin_id: binId,
    name: name
  });

  await bin.save();

  return binId;
}

export async function updateBinName(binId: string, updatedName: string) {
  const result = await BinModel.findOneAndUpdate(
    { bin_id: binId },
    { name: updatedName },
    { new: true }
  );

  if (!result) {
    throw new Error('Bin not found or could not be updated');
  }

  return result.name;
}
