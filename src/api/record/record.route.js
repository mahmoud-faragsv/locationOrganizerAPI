import express from 'express';
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecord,
  updateRecord
} from './record.controller.js';

const router = express.Router();

router.route('/').get(getAllRecords).post(createRecord);

router.route('/:id').get(getRecord).patch(updateRecord).delete(deleteRecord);

export default router;
