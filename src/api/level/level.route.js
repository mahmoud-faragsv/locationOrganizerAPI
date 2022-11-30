import express from 'express';
import {
  createLevel,
  fetchLevels,
  updateLevel,
  getAllLevels
} from './level.controller.js';
import {
  validateLevelsInputs,
  validateGetLevelsQuery,
  validateLevelUpdate
} from './level.validator.js';

const router = express.Router();

router
  .route('/')
  .post(validateLevelsInputs, createLevel)
  .get(validateGetLevelsQuery, fetchLevels);
router.route('/:id').patch(validateLevelUpdate, updateLevel);
export default router;
