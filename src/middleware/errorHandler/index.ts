import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import Logger from '../../utils/logger';
import DocumentNotFoundError from './errors/DocumentNotFoundError';

const logger = Logger('error_handler');

export const handleDocumentNotFoundError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof DocumentNotFoundError) {
    res.status(404).formatResponse(err.message);
    return;
  }
  next(err);
};

export const handleValidationError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(400).formatResponse(err.message);
    return;
  }
  next(err);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('------- Unhandled error cases -------');
  logger.error(`name: ${err.name}`);
  logger.error(`message: ${err.message}`);
  logger.error(`stack: ${err.stack}`);
  logger.error('------- Unhandled error cases -------');
  res.status(500).formatResponse('Unable to handle the request, please try again later');
};
