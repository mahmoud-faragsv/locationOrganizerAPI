import express from 'express';
import {
  createLevel,
  updateLevel,
  getAllLevels,
  GetRootType,
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
  .route('/:title')
  .get(validateGetRecordsQuery, getAllRecords)
  .patch(validateLevelUpdate, updateLevel);
router.route('/root-type').get(GetRootType);
export default router;
