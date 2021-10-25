"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branch_controller_1 = __importDefault(require("../controllers/branch.controller"));
const branchRouter = (0, express_1.Router)();
const branchController = new branch_controller_1.default();
branchRouter.get('', branchController.getAllBranches);
branchRouter.post('', branchController.addBranch);
branchRouter.get('/:id', branchController.getBranchById);
branchRouter.put('/:id', branchController.updateBranchById);
branchRouter.delete('/:id', branchController.deleteBranchById);
exports.default = branchRouter;
//# sourceMappingURL=branch.route.js.map