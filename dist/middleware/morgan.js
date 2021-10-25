"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)();
const stream = {
    write: (message) => logger.info(message.trim()),
};
const format = (0, config_1.default)('NODE_ENV') === 'production' ? 'combined' : 'dev';
exports.default = (0, morgan_1.default)(format, { stream });
//# sourceMappingURL=morgan.js.map