import { Schema, Document } from 'mongoose';
import IModel from '../interfaces/IModel';
import { IUser } from '../shared/validation/interfaces/user';
export interface IUserDocument extends Required<IUser>, Document {
    _id: string;
    createdAt: Date;
}
export default class UserModel implements IModel {
    schema: Schema<any, import("mongoose").Model<any, any, any>, {}>;
    model: import("mongoose").Model<IUserDocument, {}, {}>;
}
