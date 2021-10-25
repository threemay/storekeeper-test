"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const config_1 = __importDefault(require("../config"));
const NODE_ENV = (0, config_1.default)('NODE_ENV');
const logger = (0, winston_1.createLogger)({
    level: NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }), winston_1.format.printf((info) => {
        const { level, message, timestamp, namespace, stack } = info, restMeta = __rest(info, ["level", "message", "timestamp", "namespace", "stack"]);
        const ns = namespace ? `[${namespace}] ` : '';
        const stackMessage = stack ? `\n${stack}` : '';
        const otherMetaMessage = Object.keys(restMeta).length > 0 ? `\n${JSON.stringify(restMeta)}` : '';
        return `${timestamp} ${ns}[${level}]: ${message} ${otherMetaMessage}${stackMessage}`;
    })),
    transports: [
        new winston_1.transports.Console({
            silent: NODE_ENV === 'test',
        }),
    ],
});
if (NODE_ENV === 'production') {
    // TODO (mason): export log
}
const Logger = (namespace) => {
    if (namespace) {
        return logger.child({ namespace });
    }
    return logger;
};
exports.default = Logger;
//# sourceMappingURL=logger.js.map