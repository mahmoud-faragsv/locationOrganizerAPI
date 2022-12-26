import express from 'express';
import {
  createLevel,
  updateLevel,
  getAllLevels,
  GetRootType
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
  .get(validateGetLevelsQuery, getAllLevels);
router.route('/:id').patch(validateLevelUpdate, updateLevel);
router.route('/root-type').get(GetRootType);
export default router;
