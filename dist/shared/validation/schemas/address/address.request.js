"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addressSchema = joi_1.default.object({
    address: joi_1.default.string().optional(),
    suburb: joi_1.default.string().optional(),
    postcode: joi_1.default.number().optional(),
    city: joi_1.default.string().optional(),
    state: joi_1.default.string().optional(),
    country: joi_1.default.string().optional(),
}).meta({ className: 'IAddress' });
exports.default = addressSchema;
//# sourceMappingURL=address.request.js.map