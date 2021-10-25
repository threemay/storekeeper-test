import { Schema, Document } from 'mongoose';
import IModel from '../interfaces/IModel';
import { IBranch } from '../shared/validation/interfaces/branch';
export interface IBranchDocument extends Required<IBranch>, Document {
    _id: string;
    createdAt: Date;
}
export default class BranchModel implements IModel {
    schema: Schema<any, import("mongoose").Model<any, any, any>, {}>;
    model: import("mongoose").Model<IBranchDocument, {}, {}>;
}
