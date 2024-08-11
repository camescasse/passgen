import cors from 'cors';
import { Express } from 'express';
import helmet from 'helmet';

function prod(app: Express) {
  app.use(cors());
  app.use(helmet());
}

export default prod;
