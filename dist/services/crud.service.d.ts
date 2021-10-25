import { Model } from 'mongoose';
import IModel from '../interfaces/IModel';
import { Pagination } from '../shared/interfaces/common';
import { IRequestQuery } from '../shared/validation/interfaces/common';
interface ISearchQuery {
    [index: string]: {
        $regex: string;
        $options: string;
    };
}
interface IPopulate {
    path: string;
    select: string;
}
interface IGetAll<T> {
    pagination: Pagination;
    documents: T[];
}
export default class BaseCRUDService<T> {
    model: Model<any, any>;
    searchableFields: {
        [key in keyof T]?: boolean;
    };
    sortableFields: {
        [key in keyof T]?: boolean;
    };
    constructor(model?: IModel);
    create(data: Partial<T>): Promise<T>;
    getPagination: (total: number, query: IRequestQuery) => {
        skip: number;
        limit: number;
        pagination: {
            page: number;
            pageSize: number;
            totalPage: number;
            count: number;
        };
    };
    getSearchQuery: (query: IRequestQuery) => {
        $or?: undefined;
    } | {
        $or: ISearchQuery[];
    };
    getSortQuery(query: IRequestQuery): string;
    getAll(query: IRequestQuery, populate?: IPopulate): Promise<IGetAll<T>>;
    getById(id: string): Promise<T>;
    updateById(id: string, data: Partial<T>): Promise<T>;
    deleteById(id: string): Promise<T>;
}
export {};
