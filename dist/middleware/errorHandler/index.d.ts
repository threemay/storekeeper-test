import { Request, Response, NextFunction } from 'express';
export declare const handleDocumentNotFoundError: (err: Error, req: Request, res: Response, next: NextFunction) => void;
export declare const handleValidationError: (err: Error, req: Request, res: Response, next: NextFunction) => void;
export declare const handleErrors: (err: Error, req: Request, res: Response, next: NextFunction) => void;
