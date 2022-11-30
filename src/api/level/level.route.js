import express from 'express';
import { createLevel, getAllLevels, updateLevel } from './level.controller.js';
import {
  validateLevelsInputs,
  validateLevelUpdate
} from './level.validator.js';

const router = express.Router();

router.route('/').get(getAllLevels).post(validateLevelsInputs, createLevel);
router.route('/:id').patch(validateLevelUpdate, updateLevel);
export default router;
