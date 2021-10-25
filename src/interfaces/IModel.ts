import { Schema, Model } from 'mongoose';

export default interface IModel {
  schema: Schema<any>;
  model: Model<any, any>;
}
