import express from 'express';
import { createLevel, fetchLevels, GetRootType } from './level.controller.js';
import {
  validateLevelsInputs,
  validateGetLevelsQuery
} from './level.validator.js';

const router = express.Router();

router
  .route('/')
  .post(validateLevelsInputs, createLevel)
  .get(validateGetLevelsQuery, fetchLevels);

router.route('/root-type').get(GetRootType);
export default router;
