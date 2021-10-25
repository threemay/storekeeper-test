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
let UserModel = class UserModel {
    constructor() {
        this.schema = new mongoose_1.Schema({
            password: {
                type: String,
                required: true,
            },
            DOB: Date,
            firstName: {
                type: String,
                required: true,
                trim: true,
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
            },
            userName: String,
            role: {
                type: String,
                enum: ['manager', 'receptionist', 'therapist'],
                required: true,
            },
            gender: {
                type: String,
                enum: ['male', 'female'],
            },
            mobile: {
                type: String,
                required: true,
            },
            email: String,
            profitLevel: {
                type: Number,
                required: true,
            },
            address: {
                address: String,
                suburb: String,
                postcode: Number,
                city: String,
                state: String,
                country: String,
            },
            certified: {
                type: Boolean,
                default: false,
            },
            comment: String,
            createBy: {
                type: String,
                ref: 'User',
            },
            createdAt: {
                type: Date,
                default: new Date(),
            },
            branches: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Branch',
                },
            ],
            // TODO: update to Order in the future
            active: {
                type: Boolean,
                default: true,
            },
            // TODO: update to attatchments in the future
            loginHistory: [
                {
                    ip: String,
                    time: Date,
                },
            ],
        });
        this.model = (0, mongoose_1.model)('User', this.schema);
    }
};
UserModel = __decorate([
    (0, tsyringe_1.singleton)()
], UserModel);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map