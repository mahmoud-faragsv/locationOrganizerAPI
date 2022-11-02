import express from 'express';
import {
  createUnit,
  getAllUnits,
  getUnit,
  updateUnit
} from './unit.controller';

const router = express.Router();

router.route('/').get(getAllUnits).post(createUnit);
router.route('/:id').get(getUnit).patch(updateUnit);
export default router;
