import { Request, Response } from 'express';
import RequestWithBody from '../interfaces/RequestWithBody';
import BranchService from '../services/branch.service';
import { IAddBranchRequest, IUpdateBranchRequest } from '../shared/validation/interfaces/branch';
export default class BranchController {
    private branchService;
    constructor(branchService?: BranchService);
    addBranch: (req: RequestWithBody<IAddBranchRequest>, res: Response) => Promise<void>;
    getAllBranches: (req: Request, res: Response) => Promise<void>;
    getBranchById: (req: Request, res: Response) => Promise<void>;
    updateBranchById: (req: RequestWithBody<IUpdateBranchRequest>, res: Response) => Promise<void>;
    deleteBranchById: (req: Request, res: Response) => Promise<void>;
}
