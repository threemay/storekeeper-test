"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
let BranchModel = class BranchModel {
    constructor() {
        this.schema = new mongoose_1.Schema({
            fullName: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            address: {
                address: String,
                suburb: String,
                postcode: Number,
                city: String,
                state: String,
                country: String,
            },
            contactNumber: {
                type: String,
                required: true,
            },
            manager: {
                type: String,
                ref: 'User',
            },
            description: String,
            createdAt: {
                type: Date,
                default: new Date(),
            },
            active: {
                type: Boolean,
                default: true,
            },
            staffs: {
                type: [String],
                ref: 'User',
            },
            logo: String,
            timezone: String,
            comment: String,
        });
        this.model = (0, mongoose_1.model)('Branch', this.schema);
    }
};
BranchModel = __decorate([
    (0, tsyringe_1.singleton)()
], BranchModel);
exports.default = BranchModel;
//# sourceMappingURL=branch.model.js.map