"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const joi_to_typescript_1 = require("joi-to-typescript");
function types() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Running joi-to-typescript...');
        const result = yield (0, joi_to_typescript_1.convertFromDirectory)({
            schemaDirectory: './src/shared/validation/schemas',
            typeOutputDirectory: './src/shared/validation/interfaces',
            debug: true,
        });
        if (result) {
            console.log('Completed joi-to-typescript');
        }
        else {
            console.log('Failed to run joi-to-typescript');
        }
    });
}
types();
//# sourceMappingURL=script.js.map