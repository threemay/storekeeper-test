import 'reflect-metadata';
import { container } from 'tsyringe';
import { mocked } from 'ts-jest/utils';
import BranchService from '../../../services/branch.service';
import { fakeAddBranchRequest, fakeAddBranchResponse } from '../../__mocks__/branch';
import BranchModel from '../../../models/branch.model';

jest.mock('../../../models/branch.model', () =>
  jest.fn().mockImplementation(() => ({
    model: {
      create: jest.fn(),
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      countDocuments: jest.fn(),
      exec: jest.fn(),
    },
  }))
);

const modelMock = mocked<BranchModel>(container.resolve(BranchModel), true);
const service = new BranchService(modelMock);

const fakeRequestQuery = {
  page: 1,
  pageSize: 10,
  search: 'sydney',
  sort: 'name',
};

const countDocuments = 5;

const expectedFakePagination = {
  page: fakeRequestQuery.page,
  pageSize: fakeRequestQuery.pageSize,
  totalPage: 1,
  count: countDocuments,
};

const expectedSearchQuery = {
  $or: [
    { name: { $regex: fakeRequestQuery.search, $options: 'i' } },
    { fullName: { $regex: fakeRequestQuery.search, $options: 'i' } },
  ],
};

describe('branch service', () => {
  describe('create', () => {
    it('should successfully create the branch', async () => {
      modelMock.model.create.mockImplementation(() => fakeAddBranchResponse);

      const data = await service.create(fakeAddBranchRequest);
      expect(modelMock.model.create).toHaveBeenCalledWith(fakeAddBranchRequest);
      expect(data).toBe(fakeAddBranchResponse);
    });
  });

  describe('getAll', () => {
    it('should successfully get all branches', async () => {
      modelMock.model.countDocuments.mockResolvedValue(countDocuments);

      const getSearchQuery = jest.spyOn(service, 'getSearchQuery');
      const getSortQuery = jest.spyOn(service, 'getSortQuery');
      const getPagination = jest.spyOn(service, 'getPagination');
      await service.getAll(fakeRequestQuery);
      expect(getPagination).toHaveBeenCalledWith(countDocuments, fakeRequestQuery);
      expect(getSearchQuery).toHaveBeenCalledWith(fakeRequestQuery);
      expect(getSortQuery).toHaveBeenCalledWith(fakeRequestQuery);
    });
  });

  describe('getPagination', () => {
    it('should successfully return pagination info', () => {
      const { skip, limit, pagination } = service.getPagination(countDocuments, fakeRequestQuery);

      expect(skip).toBe(0);
      expect(limit).toBe(10);
      expect(pagination).toEqual(expectedFakePagination);
    });

    it.each`
      field         | value
      ${'page'}     | ${undefined}
      ${'pageSize'} | ${undefined}
      ${'page'}     | ${3}
    `('returns  expected  pagination when $field is $value', ({ field, value }) => {
      const request = { ...fakeRequestQuery, [field]: value };
      const { skip, limit, pagination } = service.getPagination(countDocuments, request);

      expect(skip).toBe(0);
      expect(limit).toBe(10);
      expect(pagination).toEqual(expectedFakePagination);
    });
  });

  describe('getSearchQuery', () => {
    it('should successfully return search query', () => {
      const searchQuery = service.getSearchQuery(fakeRequestQuery);

      expect(searchQuery).toEqual(expectedSearchQuery);
    });
  });

  describe('getSortQuery', () => {
    it('should successfully return sort query', () => {
      const sortBy = service.getSortQuery(fakeRequestQuery);

      expect(sortBy).toBe(fakeRequestQuery.sort);
    });

    it.each`
      field     | value          | expected
      ${'sort'} | ${'-name'}     | ${'-name'}
      ${'sort'} | ${'++name'}    | ${''}
      ${'sort'} | ${'age'}       | ${''}
      ${'sort'} | ${'undefined'} | ${''}
      ${'sort'} | ${'-name,age'} | ${'-name'}
    `('returns $expected when $field is $value', ({ field, value, expected }) => {
      const request = { ...fakeRequestQuery, [field]: value };
      const sortBy = service.getSortQuery(request);

      expect(sortBy).toBe(expected);
    });
  });
});
