"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const config_1 = __importDefault(require("../config"));
const logger = (0, logger_1.default)('db');
const connectToDB = () => {
    const connectionString = (0, config_1.default)('DB_URL');
    const db = mongoose_1.default.connection;
    db.on('connected', () => {
        logger.info(`DB connected with ${connectionString}`);
    });
    db.on('error', (error) => {
        logger.error('DB connection failed');
        logger.error(error.message);
        process.exit(1);
    });
    db.on('disconnected', () => {
        logger.info('mongoose connection disconnected');
    });
    mongoose_1.default.connect(connectionString);
};
exports.default = connectToDB;
//# sourceMappingURL=connect.js.map