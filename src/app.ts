import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from './middleware/morgan';
import router from './routes';
import {
  handleDocumentNotFoundError,
  handleErrors,
  handleValidationError,
} from './middleware/errorHandler';
import responseFormatter from './middleware/responseFormatter';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan);
app.use(responseFormatter);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Ok');
});

app.use('/v1', router);

app.use(handleDocumentNotFoundError);
app.use(handleValidationError);
app.use(handleErrors);

export default app;
