import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/no-mutable-exports
let ENV = {
  NODE_ENV: process.env.NODE_ENV,
  USERS_DEFINED_BUNDLE_KEY: process.env.USERS_DEFINED_BUNDLE_KEY,
  RES_BUNDLE_MESSAGE_KEY_SIZE: process.env.RES_BUNDLE_MESSAGE_KEY_SIZE,
  DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT
};

if (process.env.NODE_ENV === 'development') {
  ENV = {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...ENV,
    DB_USER: process.env.DB_USER_DEV,
    DB_HOST: process.env.DB_HOST_DEV,
    DB_PORT: process.env.DB_PORT_DEV,
    DB_PASSWORD: process.env.DB_PASSWORD_DEV,
    DB_NAME: process.env.DB_NAME_DEV
  };
}
if (process.env.NODE_ENV === 'production') {
  ENV = {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...ENV,
    DB_USER: process.env.DB_USER_PROD,
    DB_HOST: process.env.DB_HOST_PROD,
    DB_PORT: process.env.DB_PORT_PROD,
    DB_PASSWORD: process.env.DB_PASSWORD_PROD,
    DB_NAME: process.env.DB_NAME_PROD
  };
}
if (process.env.NODE_ENV === 'testing') {
  ENV = {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...ENV,
    DB_USER: process.env.DB_USER_DEV,
    DB_HOST: process.env.DB_HOST_DEV,
    DB_PORT: process.env.DB_PORT_DEV,
    DB_PASSWORD: process.env.DB_PASSWORD_DEV,
    DB_NAME: process.env.DB_NAME_DEV
  };
}
export default ENV;
