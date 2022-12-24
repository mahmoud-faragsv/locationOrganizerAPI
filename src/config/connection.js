import { createPool } from 'mysql2';
import ENV from './environments.js';

let pool;

/**
 * generates pool connection to be used throughout the app
 */

export const init = () => {
  try {
    pool = createPool({
      connectionLimit: ENV.DB_CONNECTION_LIMIT,
      host: ENV.DB_HOST,
      user: ENV.DB_USER,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME,
      port: +ENV.DB_PORT
    });
    console.debug(`MySql Adapter Pool generated successfully...`);
  } catch (err) {
    console.error('[mysql.connector][init][Error]: ', err);
    throw new Error('failed to initialize pool');
  }
};

/**
 * @async
 * @function  the main point for interacting with db
 * @param {string} query -  the native sql query
 * @param {[]} params  -  the expected client values to be injected in the query
 * @returns {Promise<[[]]>} - the db result [[rows, fields]] , rows: the db result, fields: db meta data about the query
 */
export const Query = (query, params) =>
  new Promise((resolve, reject) => {
    pool.query(query, params, (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve([rows, fields]);
    });
  });

// export const Execute = (query, params) =>
//   new Promise((resolve, reject) => {
//     pool.query(query, [params], (err, rows, fields) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       resolve([rows, fields]);
//     });
//   });
