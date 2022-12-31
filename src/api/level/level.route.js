import express from 'express';
import {
  createLevel,
  updateLevel,
  GetRootType,
  getAllRecords,
  fetchAllChildLevels,
  getAllLevels
} from './level.controller.js';
import {
  validateLevelsInputs,
  validateGetLevelsQuery,
  validateLevelUpdate,
  validateGetRecordsQuery
} from './level.validator.js';

const router = express.Router();

router.route('/root-type').get(GetRootType);
router.route('/').post(validateLevelsInputs, createLevel);

router.route('/child-levels').get(validateGetLevelsQuery, fetchAllChildLevels);
router.route('/all-levels').get(validateGetLevelsQuery, getAllLevels);

router
  .route('/:title')
  .get(validateGetRecordsQuery, getAllRecords)
  .patch(validateLevelUpdate, updateLevel);
export default router;
