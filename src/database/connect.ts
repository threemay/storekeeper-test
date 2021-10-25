import mongoose from 'mongoose';
import Logger from '../utils/logger';
import getConfig from '../config';

const logger = Logger('db');

const connectToDB = () => {
  const connectionString = getConfig('DB_URL');

  const db = mongoose.connection;
  db.on('connected', () => {
    logger.info(`DB connected with ${connectionString}`);
  });
  db.on('error', (error) => {
    logger.error('DB connection failed');
    logger.error(error.message);
    process.exit(1);
  });
  db.on('disconnected', () => {
    logger.info('mongoose connection disconnected');
  });

  mongoose.connect(connectionString);
};

export default connectToDB;
