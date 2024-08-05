import express from 'express';
import logger from './services/logger';
import routes from './startup/routes';

const app = express();
routes(app);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => logger.info(`Listening on port ${port}...`));
}
