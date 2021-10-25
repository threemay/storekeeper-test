"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.handleValidationError = exports.handleDocumentNotFoundError = void 0;
const joi_1 = require("joi");
const logger_1 = __importDefault(require("../../utils/logger"));
const DocumentNotFoundError_1 = __importDefault(require("./errors/DocumentNotFoundError"));
const logger = (0, logger_1.default)('error_handler');
const handleDocumentNotFoundError = (err, req, res, next) => {
    if (err instanceof DocumentNotFoundError_1.default) {
        res.status(404).formatResponse(err.message);
        return;
    }
    next(err);
};
exports.handleDocumentNotFoundError = handleDocumentNotFoundError;
const handleValidationError = (err, req, res, next) => {
    if (err instanceof joi_1.ValidationError) {
        res.status(400).formatResponse(err.message);
        return;
    }
    next(err);
};
exports.handleValidationError = handleValidationError;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleErrors = (err, req, res, next) => {
    logger.error('------- Unhandled error cases -------');
    logger.error(`name: ${err.name}`);
    logger.error(`message: ${err.message}`);
    logger.error(`stack: ${err.stack}`);
    logger.error('------- Unhandled error cases -------');
    res.status(500).formatResponse('Unable to handle the request, please try again later');
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=index.js.map