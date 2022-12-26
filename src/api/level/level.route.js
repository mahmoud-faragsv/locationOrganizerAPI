import express from 'express';
import {
  createLevel,
  updateLevel,
  getAllLevels,
  getAllRecords
} from './level.controller.js';
import {
  validateLevelsInputs,
  validateGetLevelsQuery,
  validateLevelUpdate,
  validateGetRecordsQuery
} from './level.validator.js';

const router = express.Router();

router
  .route('/')
  .post(validateLevelsInputs, createLevel)
  .get(validateGetLevelsQuery, getAllLevels);
router
  .route('/:id')
  .get(validateGetRecordsQuery, getAllRecords)
  .patch(validateLevelUpdate, updateLevel);
export default router;
