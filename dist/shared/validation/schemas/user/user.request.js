"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.addUserSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const address_request_1 = __importDefault(require("../address/address.request"));
// the auto convert lib doesn't support joi's extend method yet
// this is a work around
const baseSchema = {
    _id: joi_1.default.string().required(),
    password: joi_1.default.string().min(4).max(10).required(),
    DOB: joi_1.default.string().optional(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    userName: joi_1.default.string().optional(),
    role: joi_1.default.string().valid('manager', 'receptionist', 'therapist').required(),
    gender: joi_1.default.string().valid('male', 'female').required(),
    mobile: joi_1.default.string()
        .regex(/^(?:\+?61|0)4 ?(?:(?:[01] ?[0-9]|2 ?[0-57-9]|3 ?[1-9]|4 ?[7-9]|5 ?[018]) ?[0-9]|3 ?0 ?[0-5])(?: ?[0-9]){5}$/)
        .required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .optional(),
    address: address_request_1.default.optional(),
    certified: joi_1.default.bool().optional(),
    active: joi_1.default.bool().optional(),
};
exports.userSchema = joi_1.default.object(Object.assign({}, baseSchema)).meta({ className: 'IUser' });
exports.addUserSchema = joi_1.default.object(Object.assign({}, baseSchema)).meta({ className: 'IAddUserRequest' });
exports.updateUserSchema = joi_1.default.object(Object.assign({}, baseSchema)).meta({ className: 'IUpdateUserRequest' });
//# sourceMappingURL=user.request.js.map