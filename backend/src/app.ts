import express from 'express';
import logger from './services/logger';
import prod from './startup/prod';
import routes from './startup/routes';

const app = express();
routes(app);
prod(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

export default server;
