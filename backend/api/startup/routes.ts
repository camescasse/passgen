import cors from 'cors';
import { Express, json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import error from '../middleware/error';
import generator from '../routes/generator';
import home from '../routes/home';

function routes(app: Express) {
  app.use(json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use('/', home);
  app.use('/api/generator', generator);
  app.use(error);
}

export default routes;
