/* eslint-disable import/first */
process.on('uncaughtException', (err) => {
  console.log(`${err.name}, ${err.message}`);
  console.log('UnhandledRejection error, server shutting down....');

  process.exit(1);
});
import app from './src/app.js';
import { init } from './src/config/connection.js';
import ENV from './src/config/environments.js';

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`server up on: ${PORT}....`);
  init();
});
console.log(ENV);
// handling unhandled rejections errors
process.on('unhandledRejection', (err) => {
  // console.log(err);
  console.log(`${err.name}, ${err.message}`);
  console.log('UnhandledRejection error, server shutting down....');
  server.close(() => {
    process.exit(1);
  });
});
