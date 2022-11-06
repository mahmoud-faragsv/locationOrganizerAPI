import { createPool } from 'mysql2';
// import ENV from './index.js';

let pool;

/**
 * generates pool connection to be used throughout the app
 */
export const init = () => {
  try {
    pool = createPool({
      connectionLimit: process.env.CONNECTION_LIMIT,
      host: process.env.HOST,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    });
    console.debug(`MySql Adapter Pool generated successfully...`);
  } catch (err) {
    console.error('[mysql.connector][init][Error]: ', err);
    throw new Error('failed to initialize pool');
  }
};

export const execute = (query, params) =>
  new Promise((resolve, reject) => {
    pool.query(query, [params], (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve([rows, fields]);
    });
  });
