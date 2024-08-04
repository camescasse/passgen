import { Express } from 'express';
import generator from '../routes/generator';
import home from '../routes/home';

function routes(app: Express) {
  app.use('/', home);
  app.use('/generator', generator);
}

export default routes;
