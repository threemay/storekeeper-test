import { createLogger, format, transports } from 'winston';
import getConfig from '../config';

const NODE_ENV = getConfig('NODE_ENV');
const logger = createLogger({
  level: NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
    format.printf((info) => {
      const { level, message, timestamp, namespace, stack, ...restMeta } = info;
      const ns = namespace ? `[${namespace}] ` : '';
      const stackMessage = stack ? `\n${stack}` : '';
      const otherMetaMessage =
        Object.keys(restMeta).length > 0 ? `\n${JSON.stringify(restMeta)}` : '';
      return `${timestamp} ${ns}[${level}]: ${message} ${otherMetaMessage}${stackMessage}`;
    })
  ),
  transports: [
    new transports.Console({
      silent: NODE_ENV === 'test',
    }),
  ],
});

if (NODE_ENV === 'production') {
  // TODO (mason): export log
}

const Logger = (namespace?: string) => {
  if (namespace) {
    return logger.child({ namespace });
  }
  return logger;
};

export default Logger;
