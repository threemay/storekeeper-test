"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const RequestQuerySchema = joi_1.default.object({
    page: joi_1.default.number().integer().default(1),
    pageSize: joi_1.default.number().positive().integer().default(10),
    sort: joi_1.default.string().optional(),
    search: joi_1.default.string().optional(),
}).meta({ className: 'IRequestQuery' });
exports.default = RequestQuerySchema;
//# sourceMappingURL=query.request.js.map