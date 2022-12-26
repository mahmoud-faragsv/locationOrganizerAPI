import express, { Router } from 'express';

import {
  buildLoUnitQueryParams,
  buildResBundleParams,
  uploadSingleMap,
  resizeUploadedMap
} from './record.middleware.js';
import {
  addChildRecord,
  deleteRecord,
  updateRecord,
  addRootRecord,
  uploadLocationMap,
  search,
  getRecord
} from './record.controller.js';
import {
  ValidateRootReq,
  ValidateChildReq,
  validateGetRecordQuery,
  validateRecordUpdate
} from './record.validator.js';

const router = express.Router();
// router.route('/').get(getAllRecords);
router
  .route('/child-record')
  .post(
    ValidateChildReq,
    buildResBundleParams,
    buildLoUnitQueryParams,
    addChildRecord
  );
router
  .route('/root-record')
  .post(
    ValidateRootReq,
    buildResBundleParams,
    buildLoUnitQueryParams,
    addRootRecord
  );

router.route('/search').post(search);
router
  .route('/:code')
  .get(validateGetRecordQuery, getRecord)
  .post(uploadSingleMap, resizeUploadedMap, uploadLocationMap)
  .patch(validateRecordUpdate, updateRecord)
  .delete(deleteRecord);

export default router;
