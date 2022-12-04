import express from 'express';

import {
  buildLoUnitQueryParams,
  buildResBundleParams,
  uploadSingleMap,
  resizeUploadedMap
} from './record.middleware.js';
import {
  addChildRecord,
  deleteRecord,
  getAllRecords,
  updateRecord,
  addRootRecord,
  uploadLocationMap,
  search
} from './record.controller.js';
import { ValidateRootReq, ValidateChildReq } from './record.validator.js';

const router = express.Router();

router.route('/').get(getAllRecords);
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
  .post(uploadSingleMap, resizeUploadedMap, uploadLocationMap)
  .patch(updateRecord)
  .delete(deleteRecord);

export default router;
