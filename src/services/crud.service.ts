import { Model } from 'mongoose';
import IModel from '../interfaces/IModel';
import DocumentNotFoundError from '../middleware/errorHandler/errors/DocumentNotFoundError';
import { Pagination } from '../shared/interfaces/common';
import { IRequestQuery } from '../shared/validation/interfaces/common';

interface ISearchQuery {
  [index: string]: { $regex: string; $options: string };
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

  searchableFields: { [key in keyof T]?: boolean };

  sortableFields: { [key in keyof T]?: boolean };

  constructor(model?: IModel) {
    this.model = model?.model as Model<any, any>;
    this.searchableFields = {};
    this.sortableFields = {};
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  getPagination = (total: number, query: IRequestQuery) => {
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

  getSearchQuery = (query: IRequestQuery) => {
    const searchWords = query.search?.trim();
    if (!searchWords) {
      return {};
    }
    const searchArray: ISearchQuery[] = Object.keys(this.searchableFields).map((key) => {
      const search: ISearchQuery = {
        [key]: { $regex: `${searchWords}`, $options: 'i' },
      };
      return search;
    });
    return {
      $or: searchArray,
    };
  };

  getSortQuery(query: IRequestQuery): string {
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

  async getAll(query: IRequestQuery, populate?: IPopulate): Promise<IGetAll<T>> {
    const searchQuery = this.getSearchQuery(query);
    const total = await this.model.find(searchQuery).countDocuments();
    const { skip, limit, pagination } = this.getPagination(total, query);
    const sortBy = this.getSortQuery(query);
    let documentQuery = this.model.find(searchQuery).skip(skip).limit(limit).sort(sortBy);
    if (populate) {
      documentQuery = documentQuery.populate(populate);
    }
    const documents = await documentQuery.exec();
    return { documents, pagination };
  }

  async getById(id: string): Promise<T> {
    const document = await this.model.findById(id);
    if (!document) {
      throw new DocumentNotFoundError(this.model.modelName, id);
    }
    return document;
  }

  async updateById(id: string, data: Partial<T>): Promise<T> {
    const document = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!document) {
      throw new DocumentNotFoundError(this.model.modelName, id);
    }
    return document;
  }

  async deleteById(id: string): Promise<T> {
    const document = await this.model.findByIdAndDelete(id);
    if (!document) {
      throw new DocumentNotFoundError(this.model.modelName, id);
    }
    return document;
  }
}
