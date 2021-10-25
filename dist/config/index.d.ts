interface Config {
    PORT?: string;
    NODE_ENV?: string;
    DB_URL?: string;
}
declare const getConfig: (name: keyof Config) => string;
export default getConfig;
