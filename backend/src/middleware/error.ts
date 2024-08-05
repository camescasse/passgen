import logger from '../services/logger';

export default function (err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send('Server failure.');
}
