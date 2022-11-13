import express from 'express';
import {
  addChildRecord,
  deleteRecord,
  getAllRecords,
  getRecord,
  updateRecord,
  addRootRecord
} from './record.controller.js';

const router = express.Router();

router.route('/').get(getAllRecords);
router.route('/child-record').post(addChildRecord);
router.route('/root-record').post(addRootRecord);

router.route('/:id').get(getRecord).patch(updateRecord).delete(deleteRecord);

export default router;
