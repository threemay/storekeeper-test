import app from './app';
import getConfig from './config';
import connectToDB from './database/connect';
import Logger from './utils/logger';

const logger = Logger('index.ts');

connectToDB();

const PORT = getConfig('PORT');
app.listen(PORT, () => {
  logger.info(`Server listening at port: ${PORT}`);
});
