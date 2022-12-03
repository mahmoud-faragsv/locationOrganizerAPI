import express from 'express';
import { createLevel, updateLevel, getAllLevels } from './level.controller.js';
import {
  validateLevelsInputs,
  validateGetLevelsQuery,
  validateLevelUpdate
} from './level.validator.js';

const router = express.Router();

router
  .route('/')
  .post(validateLevelsInputs, createLevel)
  .get(validateGetLevelsQuery, getAllLevels);
router.route('/:id').patch(validateLevelUpdate, updateLevel);
export default router;
