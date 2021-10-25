"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = require("@jest-mock/express");
const tsyringe_1 = require("tsyringe");
const utils_1 = require("ts-jest/utils");
const branch_controller_1 = __importDefault(require("../../../controllers/branch.controller"));
const branch_service_1 = __importDefault(require("../../../services/branch.service"));
const branch_1 = require("../../__mocks__/branch");
const validate_1 = __importDefault(require("../../../shared/validation/validate"));
jest.mock('../../../services/branch.service', () => jest.fn().mockImplementation(() => ({
    create: jest.fn(),
})));
jest.mock('../../../shared/validation/validate', () => jest.fn());
const serviceMock = (0, utils_1.mocked)(tsyringe_1.container.resolve(branch_service_1.default), true);
const validationMock = (0, utils_1.mocked)(validate_1.default, true);
const controller = new branch_controller_1.default(serviceMock);
const { res } = (0, express_1.getMockRes)({
    formatResponse: jest.fn(),
});
describe('branch controller', () => {
    describe('create', () => {
        it('should successfully create a new branch', () => __awaiter(void 0, void 0, void 0, function* () {
            serviceMock.create.mockResolvedValue(branch_1.fakeAddBranchResponse);
            validationMock.mockResolvedValue(branch_1.fakeAddBranchRequest);
            const req = (0, express_1.getMockReq)({
                body: branch_1.fakeAddBranchRequest,
            });
            yield controller.addBranch(req, res);
            expect(serviceMock.create).toHaveBeenCalledWith(branch_1.fakeAddBranchRequest);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.formatResponse).toHaveBeenCalledWith(branch_1.fakeAddBranchResponse);
        }));
    });
});
//# sourceMappingURL=branch.controller.test.js.map