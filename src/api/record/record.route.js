import express from 'express';
import {
  buildLoUnitQueryParams,
  buildResBundleParams
} from './record.middleware.js';
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
router
  .route('/child-record')
  .post(buildResBundleParams, buildLoUnitQueryParams, addChildRecord);
router
  .route('/root-record')
  .post(buildResBundleParams, buildLoUnitQueryParams, addRootRecord);

router.route('/:id').get(getRecord).patch(updateRecord).delete(deleteRecord);

export default router;
