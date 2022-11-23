import express from 'express';
import { createLevel, fetchLevels } from './level.controller.js';
import {
  validateLevelsInputs,
  validateGetLevelsQuery
} from './level.validator.js';

const router = express.Router();

router
  .route('/')
  .post(validateLevelsInputs, createLevel)
  .get(validateGetLevelsQuery, fetchLevels);
export default router;
