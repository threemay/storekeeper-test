"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DocumentNotFoundError extends Error {
    constructor(modelName, documentId) {
        super(`${documentId} not found in ${modelName}`);
    }
}
exports.default = DocumentNotFoundError;
//# sourceMappingURL=DocumentNotFoundError.js.map