import { Router } from 'express';
import BranchController from '../controllers/branch.controller';

const branchRouter = Router();
const branchController = new BranchController();

branchRouter.get('', branchController.getAllBranches);
branchRouter.post('', branchController.addBranch);
branchRouter.get('/:id', branchController.getBranchById);
branchRouter.put('/:id', branchController.updateBranchById);
branchRouter.delete('/:id', branchController.deleteBranchById);

export default branchRouter;
