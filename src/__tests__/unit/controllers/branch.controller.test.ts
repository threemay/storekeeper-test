import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { container } from 'tsyringe';
import { mocked } from 'ts-jest/utils';
import BranchController from '../../../controllers/branch.controller';
import BranchService from '../../../services/branch.service';
import { fakeAddBranchRequest, fakeAddBranchResponse } from '../../__mocks__/branch';
import { IBranchDocument } from '../../../models/branch.model';
import JoiValidate from '../../../shared/validation/validate';

jest.mock('../../../services/branch.service', () =>
  jest.fn().mockImplementation(() => ({
    create: jest.fn(),
  }))
);

jest.mock('../../../shared/validation/validate', () => jest.fn());

const serviceMock = mocked<BranchService>(container.resolve(BranchService), true);
const validationMock = mocked<typeof JoiValidate>(JoiValidate, true);
const controller = new BranchController(serviceMock);
const { res } = getMockRes({
  formatResponse: jest.fn(),
});

describe('branch controller', () => {
  describe('create', () => {
    it('should successfully create a new branch', async () => {
      serviceMock.create.mockResolvedValue(fakeAddBranchResponse as IBranchDocument);
      validationMock.mockResolvedValue(fakeAddBranchRequest);
      const req = getMockReq({
        body: fakeAddBranchRequest,
      });

      await controller.addBranch(req, res);
      expect(serviceMock.create).toHaveBeenCalledWith(fakeAddBranchRequest);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.formatResponse).toHaveBeenCalledWith(fakeAddBranchResponse);
    });
  });
});
