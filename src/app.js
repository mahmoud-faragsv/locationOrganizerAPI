import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';
//Routes
import levelRouter from './api/level/level.route.js';
import levelContentRouter from './api/level-content/level-content.route.js';

import globalErrHandler from './middelwares/globalErrHandler.js';
import NotFoundErr from './errors/notFound.error.js';
// import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.get('/', (req, res) => {
  res.status(200).send('Server is up now ');
});
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use('/api/v1/level', levelRouter);
app.use('/api/v1/level-content', levelContentRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundErr(`Can not find ${req.originalUrl} on this server`);
});

app.use(globalErrHandler);

export default app;
