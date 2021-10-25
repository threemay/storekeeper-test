import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import RequestWithBody from '../interfaces/RequestWithBody';
import BranchService from '../services/branch.service';
import {
  IGetAllBranchResponse,
  IGetBranchResponse,
} from '../shared/interfaces/response/branch.response';
import { IAddBranchRequest, IUpdateBranchRequest } from '../shared/validation/interfaces/branch';
import { IRequestQuery } from '../shared/validation/interfaces/common';
import {
  addBranchSchema,
  updateBranchSchema,
} from '../shared/validation/schemas/branch/branch.request';
import QuerySchema from '../shared/validation/schemas/common/query.request';
import JoiValidate from '../shared/validation/validate';

@autoInjectable()
export default class BranchController {
  private branchService: BranchService;

  constructor(branchService?: BranchService) {
    this.branchService = branchService as BranchService;
  }

  addBranch = async (req: RequestWithBody<IAddBranchRequest>, res: Response) => {
    const data = await JoiValidate<IAddBranchRequest>(req.body, addBranchSchema);
    const branch = await this.branchService.create(data);
    res.status(201).formatResponse(branch);
  };

  getAllBranches = async (req: Request, res: Response) => {
    const query = await JoiValidate<IRequestQuery>(req.query, QuerySchema);
    const { documents, pagination } = await this.branchService.getAll(query);

    res.formatResponse<IGetAllBranchResponse[]>(documents, pagination);
  };

  getBranchById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const branch = await this.branchService.getById(id);
    res.formatResponse<IGetBranchResponse>(branch);
  };

  updateBranchById = async (req: RequestWithBody<IUpdateBranchRequest>, res: Response) => {
    const data = await JoiValidate<IUpdateBranchRequest>(req.body, updateBranchSchema);
    const { id } = req.params;
    const branch = await this.branchService.updateById(id, data);
    res.formatResponse(branch);
  };

  deleteBranchById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.branchService.deleteById(id);
    res.sendStatus(204);
  };
}
