import moment from 'moment';
import multer from 'multer';
import sharp from 'sharp';

import CONSTANTS from '../../../common/messages.js';
import { getMsgKey } from '../../../common/shared.services.js';
import BadRequestErr from '../../errors/badRequest.error.js';
import NotFoundErr from '../../errors/notFound.error.js';
import { catchAsyncErr, genKey } from '../../general-utils/index.js';
import {
  getIdByUnitCode,
  GetLookUpId,
  getUnitCode,
  getUnitTypeId
} from './record.services.js';

//!store the image directly to the disk
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/map-uploads/');
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `map-${req.params.code}-${Date.now()}.${ext}`);
//   }
// });

//! store the image in the memory to be able to resize it in another middle ware
const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (!file.mimetype.startsWith('image'))
    return cb(
      new BadRequestErr(
        CONSTANTS.MSG.UPLOAD_MAP[req.langType],
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );

  cb(null, true);
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadSingleMap = upload.single('IMAGE_VSID');

export const resizeUploadedMap = catchAsyncErr(async (req, res, next) => {
  if (!req.file)
    return next(
      new BadRequestErr(
        CONSTANTS.MSG.NO_MAP_UPLOADED[req.langType],
        CONSTANTS.MSG.FAIL[req.langType]
      )
    );
  req.file.filename = `map-${req.params.code}-${Date.now()}.jpeg`;
  try {
    await sharp(req.file.buffer)
      .resize({ width: 1000, height: 1200, fit: 'contain' })

      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/map-uploads/${req.file.filename}`);
  } catch (err) {
    console.log(err);
    return next(new Error(CONSTANTS.MSG.MAP_RESIZING[req.langType]));
  }
  next();
});

export const buildResBundleParams = catchAsyncErr(async (req, res, next) => {
  const {
    unitData: { unitName }
  } = req.body;

  const MESSAGE_KEY = genKey(+process.env.RES_BUNDLE_MESSAGE_KEY_SIZE);

  const ResBundleParams = [
    [
      req.langTypeID,
      MESSAGE_KEY,
      process.env.USERS_DEFINED_BUNDLE_KEY,
      unitName
    ]
  ];
  req.ResBundleParams = ResBundleParams;
  req.MESSAGE_KEY = MESSAGE_KEY;
  next();
});

export const buildLoUnitQueryParams = catchAsyncErr(async (req, res, next) => {
  const {
    unitData: { unitCode, unitType, unitParentCode }
  } = req.body;

  const unitCodeRes = await getUnitCode([unitCode]);

  const isDuplicatedCode = unitCodeRes[0].length > 0;

  if (isDuplicatedCode)
    return next(new BadRequestErr(CONSTANTS.MSG.DUPLICATE_UNIT_CODE));
  const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  const loUnitParams = [
    [
      req.MESSAGE_KEY,
      unitCode,
      null,
      0,
      1,
      'IMG_url',
      1,
      1,
      time, // time of insertion= time of update
      time
    ]
  ];
  if (req.path === '/root-record') {
    const queryRes = await getUnitTypeId();
    if (queryRes[0].length === 0) {
      return next(new NotFoundErr(CONSTANTS.MSG.NO_ROOT_ID_EXIST));
    }
    const unitTypeId = queryRes[0][0].TYPE_ID;

    loUnitParams[0][3] = unitTypeId;
  }
  if (req.path === '/child-record') {
    const queryResponse = await getMsgKey([unitType]);
    if (queryResponse[0].length === 0) {
      return next(new BadRequestErr(CONSTANTS.MSG.UNIT_TYPE));
    }

    const queryRes = await GetLookUpId([queryResponse[0][0].MESSAGE_KEY]); // type have to be values in ('City', 'Country','Area',....)
    if (queryRes[0].length === 0) {
      return next(new BadRequestErr(CONSTANTS.MSG.UNIT_TYPE_DB));
    }
    const unitTypeID = queryRes[0][0].ID;
    loUnitParams[0][3] = unitTypeID;

    const qRes = await getIdByUnitCode([unitParentCode]);
    if (qRes[0].length === 0) {
      return next(new BadRequestErr(CONSTANTS.MSG.UNIT_PARENT_CODE));
    }
    loUnitParams[0][2] = qRes[0][0].ID;
  }
  req.loUnitParams = loUnitParams;
  next();
});
