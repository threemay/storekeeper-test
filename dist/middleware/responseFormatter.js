"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function responseFormatter(req, res, next) {
    res.formatResponse = (payload, pagination) => {
        let body = {};
        if (res.statusCode < 400) {
            body = {
                data: payload,
                pagination,
            };
        }
        else {
            body = {
                error: payload,
            };
        }
        res.json(body);
    };
    next();
}
exports.default = responseFormatter;
//# sourceMappingURL=responseFormatter.js.map