import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'express-async-errors';
import morgan from 'morgan';
//Routes
import levelRouter from './api/level/level.route.js';
import recordRouter from './api/record/record.route.js';
import languageRouter from './api/language/language.route.js';

import {
  globalErrHandler,
  bindInReq
} from './general-middlewares/index.js';
import NotFoundErr from './errors/notFound.error.js';
// import dotenv from 'dotenv';
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Server is up now ');
});

const __direName = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__direName, '..', 'public')));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(bindInReq);

console.log('middleware');

app.use('/api/v1/level', levelRouter);
app.use('/api/v1/languages', languageRouter);
app.use('/api/v1/record', recordRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundErr(`Can not find ${req.originalUrl} on this server`);
});

app.use(globalErrHandler);

export default app;
