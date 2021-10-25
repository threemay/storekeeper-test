import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT?: string;
  NODE_ENV?: string;
  DB_URL?: string;
}

const config: Config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL,
};

const getConfig = (name: keyof Config): string => {
  const value = config[name];
  if (value) {
    return value;
  }
  // eslint-disable-next-line no-console
  console.error(`ENV var ${name} is missing!`);
  return process.exit(1);
};

export default getConfig;
