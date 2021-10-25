import { Request } from 'express';

export default interface RequestWithBody<T> extends Request {
  body: T;
}
