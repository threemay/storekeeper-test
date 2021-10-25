"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("./middleware/morgan"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const responseFormatter_1 = __importDefault(require("./middleware/responseFormatter"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(morgan_1.default);
app.use(responseFormatter_1.default);
app.get('/health', (req, res) => {
    res.status(200).send('Ok');
});
app.use('/v1', routes_1.default);
app.use(errorHandler_1.handleDocumentNotFoundError);
app.use(errorHandler_1.handleValidationError);
app.use(errorHandler_1.handleErrors);
exports.default = app;
//# sourceMappingURL=app.js.map