import morgan, { StreamOptions } from 'morgan';
import getConfig from '../config';
import Logger from '../utils/logger';

const logger = Logger();

const stream: StreamOptions = {
  write: (message) => logger.info(message.trim()),
};

const format = getConfig('NODE_ENV') === 'production' ? 'combined' : 'dev';

export default morgan(format, { stream });
