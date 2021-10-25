import BranchModel, { IBranchDocument } from '../models/branch.model';
import BaseCRUDService from './crud.service';
export default class BranchService extends BaseCRUDService<IBranchDocument> {
    constructor(model?: BranchModel);
}
