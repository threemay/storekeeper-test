import { injectable } from 'tsyringe';
import BranchModel, { IBranchDocument } from '../models/branch.model';
import BaseCRUDService from './crud.service';

@injectable()
export default class BranchService extends BaseCRUDService<IBranchDocument> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(model?: BranchModel) {
    super(model);
    this.searchableFields = {
      name: true,
      fullName: true,
    };

    this.sortableFields = {
      name: true,
      fullName: true,
    };
  }
}
