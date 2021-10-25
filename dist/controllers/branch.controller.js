"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const tsyringe_1 = require("tsyringe");
const branch_service_1 = __importDefault(require("../services/branch.service"));
const branch_request_1 = require("../shared/validation/schemas/branch/branch.request");
const query_request_1 = __importDefault(require("../shared/validation/schemas/common/query.request"));
const validate_1 = __importDefault(require("../shared/validation/validate"));
let BranchController = class BranchController {
    constructor(branchService) {
        this.addBranch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, validate_1.default)(req.body, branch_request_1.addBranchSchema);
            const branch = yield this.branchService.create(data);
            res.status(201).formatResponse(branch);
        });
        this.getAllBranches = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const query = yield (0, validate_1.default)(req.query, query_request_1.default);
            const { documents, pagination } = yield this.branchService.getAll(query);
            res.formatResponse(documents, pagination);
        });
        this.getBranchById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const branch = yield this.branchService.getById(id);
            res.formatResponse(branch);
        });
        this.updateBranchById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, validate_1.default)(req.body, branch_request_1.updateBranchSchema);
            const { id } = req.params;
            const branch = yield this.branchService.updateById(id, data);
            res.formatResponse(branch);
        });
        this.deleteBranchById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield this.branchService.deleteById(id);
            res.sendStatus(204);
        });
        this.branchService = branchService;
    }
};
BranchController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [branch_service_1.default])
], BranchController);
exports.default = BranchController;
//# sourceMappingURL=branch.controller.js.map