"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
};
const getConfig = (name) => {
    const value = config[name];
    if (value) {
        return value;
    }
    // eslint-disable-next-line no-console
    console.error(`ENV var ${name} is missing!`);
    return process.exit(1);
};
exports.default = getConfig;
//# sourceMappingURL=index.js.map