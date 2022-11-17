import moment from 'moment';
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

  const unitCodeRes = await getUnitCode(unitCode);

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
    const queryResponse = await getMsgKey(unitType);
    if (queryResponse[0].length === 0) {
      return next(new BadRequestErr(CONSTANTS.MSG.UNIT_TYPE));
    }

    const queryRes = await GetLookUpId(queryResponse[0][0].MESSAGE_KEY); // type have to be values in ('City', 'Country','Area',....)
    if (queryRes[0].length === 0) {
      return next(new BadRequestErr(CONSTANTS.MSG.UNIT_TYPE_DB));
    }
    const unitTypeID = queryRes[0][0].ID;
    loUnitParams[0][3] = unitTypeID;

    const qRes = await getIdByUnitCode(unitParentCode);
    if (qRes[0].length === 0) {
      return next(new BadRequestErr(CONSTANTS.MSG.UNIT_PARENT_CODE));
    }
    loUnitParams[0][2] = qRes[0][0].ID;
  }
  req.loUnitParams = loUnitParams;
  next();
});
