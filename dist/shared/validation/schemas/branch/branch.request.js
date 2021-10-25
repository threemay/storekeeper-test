"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBranchSchema = exports.addBranchSchema = exports.branchSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const address_request_1 = __importDefault(require("../address/address.request"));
// the auto convert lib doesn't support joi's extend method yet
// this is a work around
const baseSchema = {
    fullName: joi_1.default.string().required(),
    name: joi_1.default.string().optional(),
    address: address_request_1.default.optional(),
    contactNumber: joi_1.default.string().required(),
    manager: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    logo: joi_1.default.string().optional(),
    timezone: joi_1.default.string().optional(),
    comment: joi_1.default.string().optional(),
    active: joi_1.default.bool().optional(),
};
exports.branchSchema = joi_1.default.object(Object.assign({}, baseSchema)).meta({ className: 'IBranch' });
exports.addBranchSchema = joi_1.default.object(Object.assign({}, baseSchema)).meta({ className: 'IAddBranchRequest' });
exports.updateBranchSchema = joi_1.default.object(Object.assign({}, baseSchema)).meta({ className: 'IUpdateBranchRequest' });
//# sourceMappingURL=branch.request.js.map