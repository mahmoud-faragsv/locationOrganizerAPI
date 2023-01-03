import express, { Router } from 'express';

import {
  buildLoUnitQueryParams,
  buildResBundleParams,
  uploadSingleMap,
  resizeUploadedMap,
  deleteImageIfExists
} from './record.middleware.js';
import {
  addChildRecord,
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
// router.use((req, res) => {
//   console.log(req.query);
//   console.log(req.originalUrl);
// });
router.route('/search').get(search);
// router.route('/search').get((req, res) => {
//   console.log(req.query);
//   console.log(req.originalUrl);
// });
router
  .route('/:code')
  .get(validateGetRecordQuery, getRecord)
  .post(
    deleteImageIfExists,
    uploadSingleMap,
    resizeUploadedMap,
    uploadLocationMap
  )
  .patch(validateRecordUpdate, updateRecord);

export default router;
