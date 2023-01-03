import express from 'express';
import {
  createLevel,
  updateLevel,
  getAllRecords,
  fetchAllChildLevels,
  getAllLevels,
  GetRootLevelType
} from './level.controller.js';
import {
  validateLevelsInputs,
  validateGetLevelsQuery,
  validateLevelUpdate,
  validateGetRecordsQuery
} from './level.validator.js';

const router = express.Router();

router.route('/').post(validateLevelsInputs, createLevel);

router.route('/root-level').get(GetRootLevelType);

router.route('/child-levels').get(validateGetLevelsQuery, fetchAllChildLevels);
router.route('/all-levels').get(validateGetLevelsQuery, getAllLevels);

router
  .route('/:key')
  .get(validateGetRecordsQuery, getAllRecords)
  .patch(validateLevelUpdate, updateLevel);

export default router;
