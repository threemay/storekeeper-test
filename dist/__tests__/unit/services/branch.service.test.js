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
const tsyringe_1 = require("tsyringe");
const utils_1 = require("ts-jest/utils");
const branch_service_1 = __importDefault(require("../../../services/branch.service"));
const branch_1 = require("../../__mocks__/branch");
const branch_model_1 = __importDefault(require("../../../models/branch.model"));
jest.mock('../../../models/branch.model', () => jest.fn().mockImplementation(() => ({
    model: {
        create: jest.fn(),
        find: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        countDocuments: jest.fn(),
        exec: jest.fn(),
    },
})));
const modelMock = (0, utils_1.mocked)(tsyringe_1.container.resolve(branch_model_1.default), true);
const service = new branch_service_1.default(modelMock);
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
        it('should successfully create the branch', () => __awaiter(void 0, void 0, void 0, function* () {
            modelMock.model.create.mockImplementation(() => branch_1.fakeAddBranchResponse);
            const data = yield service.create(branch_1.fakeAddBranchRequest);
            expect(modelMock.model.create).toHaveBeenCalledWith(branch_1.fakeAddBranchRequest);
            expect(data).toBe(branch_1.fakeAddBranchResponse);
        }));
    });
    describe('getAll', () => {
        it('should successfully get all branches', () => __awaiter(void 0, void 0, void 0, function* () {
            modelMock.model.countDocuments.mockResolvedValue(countDocuments);
            const getSearchQuery = jest.spyOn(service, 'getSearchQuery');
            const getSortQuery = jest.spyOn(service, 'getSortQuery');
            const getPagination = jest.spyOn(service, 'getPagination');
            yield service.getAll(fakeRequestQuery);
            expect(getPagination).toHaveBeenCalledWith(countDocuments, fakeRequestQuery);
            expect(getSearchQuery).toHaveBeenCalledWith(fakeRequestQuery);
            expect(getSortQuery).toHaveBeenCalledWith(fakeRequestQuery);
        }));
    });
    describe('getPagination', () => {
        it('should successfully return pagination info', () => {
            const { skip, limit, pagination } = service.getPagination(countDocuments, fakeRequestQuery);
            expect(skip).toBe(0);
            expect(limit).toBe(10);
            expect(pagination).toEqual(expectedFakePagination);
        });
        it.each `
      field         | value
      ${'page'}     | ${undefined}
      ${'pageSize'} | ${undefined}
      ${'page'}     | ${3}
    `('returns  expected  pagination when $field is $value', ({ field, value }) => {
            const request = Object.assign(Object.assign({}, fakeRequestQuery), { [field]: value });
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
        it.each `
      field     | value          | expected
      ${'sort'} | ${'-name'}     | ${'-name'}
      ${'sort'} | ${'++name'}    | ${''}
      ${'sort'} | ${'age'}       | ${''}
      ${'sort'} | ${'undefined'} | ${''}
      ${'sort'} | ${'-name,age'} | ${'-name'}
    `('returns $expected when $field is $value', ({ field, value, expected }) => {
            const request = Object.assign(Object.assign({}, fakeRequestQuery), { [field]: value });
            const sortBy = service.getSortQuery(request);
            expect(sortBy).toBe(expected);
        });
    });
});
//# sourceMappingURL=branch.service.test.js.map