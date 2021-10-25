import { Schema, model, Document } from 'mongoose';
import { singleton } from 'tsyringe';
import IModel from '../interfaces/IModel';
import { IUser } from '../shared/validation/interfaces/user';

export interface IUserDocument extends Required<IUser>, Document {
  _id: string;
  createdAt: Date;
}

@singleton()
export default class UserModel implements IModel {
  schema = new Schema({
    password: {
      type: String,
      required: true,
    },
    DOB: Date,
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: String,
    role: {
      type: String,
      enum: ['manager', 'receptionist', 'therapist'],
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    mobile: {
      type: String,
      required: true,
    },
    email: String,
    profitLevel: {
      type: Number,
      required: true,
    },
    address: {
      address: String,
      suburb: String,
      postcode: Number,
      city: String,
      state: String,
      country: String,
    },
    certified: {
      type: Boolean,
      default: false,
    },
    comment: String,
    createBy: {
      type: String,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    branches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
      },
    ],
    // TODO: update to Order in the future
    active: {
      type: Boolean,
      default: true,
    },
    // TODO: update to attatchments in the future
    loginHistory: [
      {
        ip: String,
        time: Date,
      },
    ],
  });

  model = model<IUserDocument>('User', this.schema);
}
