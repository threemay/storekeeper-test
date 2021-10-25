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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentNotFoundError_1 = __importDefault(require("../middleware/errorHandler/errors/DocumentNotFoundError"));
class BaseCRUDService {
    constructor(model) {
        this.getPagination = (total, query) => {
            let { page = 1, pageSize = 10 } = query;
            if (pageSize < 10) {
                pageSize = 10;
            }
            const totalPage = Math.ceil(total / pageSize) || 1;
            if (page > totalPage) {
                page = totalPage;
            }
            const skip = (page - 1) * pageSize;
            return {
                skip,
                limit: pageSize,
                pagination: {
                    page,
                    pageSize,
                    totalPage,
                    count: total,
                },
            };
        };
        this.getSearchQuery = (query) => {
            var _a;
            const searchWords = (_a = query.search) === null || _a === void 0 ? void 0 : _a.trim();
            if (!searchWords) {
                return {};
            }
            const searchArray = Object.keys(this.searchableFields).map((key) => {
                const search = {
                    [key]: { $regex: `${searchWords}`, $options: 'i' },
                };
                return search;
            });
            return {
                $or: searchArray,
            };
        };
        this.model = model === null || model === void 0 ? void 0 : model.model;
        this.searchableFields = {};
        this.sortableFields = {};
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.create(data);
        });
    }
    getSortQuery(query) {
        const sortable = Object.keys(this.sortableFields);
        if (!query.sort) {
            return '';
        }
        const sortBy = query.sort
            .split(',')
            .filter((e) => {
            const element = e.trim();
            if (element.startsWith('-')) {
                const noSignElement = element.slice(1);
                return sortable.includes(noSignElement);
            }
            return sortable.includes(element);
        })
            .join(' ');
        return sortBy;
    }
    getAll(query, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchQuery = this.getSearchQuery(query);
            const total = yield this.model.find(searchQuery).countDocuments();
            const { skip, limit, pagination } = this.getPagination(total, query);
            const sortBy = this.getSortQuery(query);
            let documentQuery = this.model.find(searchQuery).skip(skip).limit(limit).sort(sortBy);
            if (populate) {
                documentQuery = documentQuery.populate(populate);
            }
            const documents = yield documentQuery.exec();
            return { documents, pagination };
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.model.findById(id);
            if (!document) {
                throw new DocumentNotFoundError_1.default(this.model.modelName, id);
            }
            return document;
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.model.findByIdAndUpdate(id, data, { new: true });
            if (!document) {
                throw new DocumentNotFoundError_1.default(this.model.modelName, id);
            }
            return document;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.model.findByIdAndDelete(id);
            if (!document) {
                throw new DocumentNotFoundError_1.default(this.model.modelName, id);
            }
            return document;
        });
    }
}
exports.default = BaseCRUDService;
//# sourceMappingURL=crud.service.js.map