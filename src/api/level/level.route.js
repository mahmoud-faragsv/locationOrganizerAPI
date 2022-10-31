import express from 'express';
import {
  createLevel,
  getAllLevels,
  getLevel,
  updateLevel
} from './level.controller.js';

const router = express.Router();

router.route('/').get(getAllLevels).post(createLevel);
router.route('/:id').get(getLevel).patch(updateLevel);
export default router;
