import { NextFunction, Request, Response } from 'express';
import logger from '../services/logger';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err.message, err);
  res.status(500).send('Server failure.');
}
