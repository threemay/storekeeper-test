import { Request, NextFunction, Response } from 'express';
import { GenericResponse, Pagination } from '../shared/interfaces/common';

export default function responseFormatter(req: Request, res: Response, next: NextFunction) {
  res.formatResponse = (payload: any, pagination?: Pagination) => {
    let body: GenericResponse = {};
    if (res.statusCode < 400) {
      body = {
        data: payload,
        pagination,
      };
    } else {
      body = {
        error: payload,
      };
    }
    res.json(body);
  };
  next();
}
