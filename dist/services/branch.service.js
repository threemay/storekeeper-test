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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const branch_model_1 = __importDefault(require("../models/branch.model"));
const crud_service_1 = __importDefault(require("./crud.service"));
let BranchService = class BranchService extends crud_service_1.default {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(model) {
        super(model);
        this.searchableFields = {
            name: true,
            fullName: true,
        };
        this.sortableFields = {
            name: true,
            fullName: true,
        };
    }
};
BranchService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [branch_model_1.default])
], BranchService);
exports.default = BranchService;
//# sourceMappingURL=branch.service.js.map