import { createPool } from 'mysql2';
import ENV from './index.js';

let pool;

/**
 * generates pool connection to be used throughout the app
 */
export const init = () => {
  try {
    // console.log(db);
    pool = createPool({
      connectionLimit: ENV.CONNECTION_LIMIT,
      host: ENV.HOST,
      user: ENV.USERNAME,
      password: ENV.PASSWORD,
      database: ENV.DATABASE
    });
    console.debug('MySql Adapter Pool generated successfully');
  } catch (err) {
    console.error('[mysql.connector][init][Error]: ', err);
    throw new Error('failed to initialized pool');
  }
};

export const execute = (query, params) =>
  new Promise((resolve, reject) => {
    pool.query(query, params, (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve([rows, fields]);
    });
  });
