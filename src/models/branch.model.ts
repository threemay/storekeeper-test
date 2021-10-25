import { Schema, model, Document } from 'mongoose';
import { singleton } from 'tsyringe';
import IModel from '../interfaces/IModel';
import { IBranch } from '../shared/validation/interfaces/branch';

export interface IBranchDocument extends Required<IBranch>, Document {
  _id: string;
  createdAt: Date;
}

@singleton()
export default class BranchModel implements IModel {
  schema = new Schema({
    fullName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    address: {
      address: String,
      suburb: String,
      postcode: Number,
      city: String,
      state: String,
      country: String,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      ref: 'User',
    },
    description: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
    active: {
      type: Boolean,
      default: true,
    },
    staffs: {
      type: [String],
      ref: 'User',
    },
    logo: String,
    timezone: String,
    comment: String,
  });

  model = model<IBranchDocument>('Branch', this.schema);
}
