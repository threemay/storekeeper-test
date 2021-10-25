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
const branch_model_1 = __importDefault(require("../../../models/branch.model"));
const branch_1 = require("../../__mocks__/branch");
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
    it('should save the branch if the fields are valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield model.create(branch_1.fakeAddBranchRequest);
        const response = yield model.findById(data._id);
        expect(response).toMatchObject(branch_1.fakeAddBranchRequest);
        expect(response === null || response === void 0 ? void 0 : response._id).toBeDefined();
        expect(response === null || response === void 0 ? void 0 : response.createdAt).toBeDefined();
    }));
});
//# sourceMappingURL=branch.model.test.js.map