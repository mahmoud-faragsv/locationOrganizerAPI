import { createPool } from 'mysql2';
// import ENV from './index.js';

let pool;

/**
 * generates pool connection to be used throughout the app
 */
export const init = () => {
  try {
    pool = createPool({
      connectionLimit: process.env.DB_CONNECTION_LIMIT,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE
    });
    console.debug(`MySql Adapter Pool generated successfully...`);
  } catch (err) {
    console.error('[mysql.connector][init][Error]: ', err);
    throw new Error('failed to initialize pool');
  }
};

export const Query = (query, params) =>
  new Promise((resolve, reject) => {
    pool.query(query, [params], (err, rows, fields) => {
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
