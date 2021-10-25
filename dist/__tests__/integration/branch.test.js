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
/* eslint-disable no-underscore-dangle */
require("reflect-metadata");
const mongoose_1 = __importDefault(require("mongoose"));
const tsyringe_1 = require("tsyringe");
const supertest_1 = __importDefault(require("supertest"));
const branch_model_1 = __importDefault(require("../../models/branch.model"));
const app_1 = __importDefault(require("../../app"));
const branch_1 = require("../__mocks__/branch");
describe('/v1/branches', () => {
    const { model } = tsyringe_1.container.resolve(branch_model_1.default);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(global.__MONGO_URI__);
        }
        catch (e) {
            process.exit(1);
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const db = mongoose_1.default.connection;
        yield db.close();
    }));
    describe('POST /', () => {
        it('should return 201 with the saved branch if the request is valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).post(`/v1/branches`).send(branch_1.fakeAddBranchRequest);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toMatchObject(branch_1.fakeAddBranchRequest);
            expect(res.body.data._id).toBeDefined();
            expect(res.body.data.createdAt).toBeDefined();
        }));
    });
    describe('GET /', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield model.deleteMany({});
        }));
        it('should return 200 with all branches and pagination if the request is valid', () => __awaiter(void 0, void 0, void 0, function* () {
            yield model.insertMany([branch_1.fakeAddBranchRequest, branch_1.fakeAddBranchRequest]);
            const res = yield (0, supertest_1.default)(app_1.default).get(`/v1/branches`).send();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('data');
            expect(res.body).toHaveProperty('pagination');
            expect(Array.isArray(res.body.data)).toBeTruthy();
            expect(res.body.data.length).toBe(2);
            expect(res.body.data[0]).toMatchObject(branch_1.fakeAddBranchRequest);
            expect(res.body.pagination.count).toBe(2);
        }));
    });
});
//# sourceMappingURL=branch.test.js.map