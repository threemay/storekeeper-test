"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const connect_1 = __importDefault(require("./database/connect"));
const logger_1 = __importDefault(require("./utils/logger"));
const logger = (0, logger_1.default)('index.ts');
(0, connect_1.default)();
const PORT = (0, config_1.default)('PORT');
app_1.default.listen(PORT, () => {
    logger.info(`Server listening at port: ${PORT}`);
});
//# sourceMappingURL=index.js.map