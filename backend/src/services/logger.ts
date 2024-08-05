import 'express-async-errors';
import { createLogger, format, transports } from 'winston';

const logPath = 'logs/logfile.log';

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new transports.File({ filename: logPath }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
  exceptionHandlers: [new transports.File({ filename: logPath }), new transports.Console()],
});

export default logger;
