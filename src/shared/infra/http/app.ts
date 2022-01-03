/* eslint-disable no-console */
import 'reflect-metadata';
import createConnection from '@shared/infra/typeorm';
import '../../container';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { AppError } from '@shared/errors/AppError';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerUi));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});

export { app };
