import moment from 'moment';
import { catchAsyncErr, genKey } from '../../general-utils/index.js';
import { GetLookUpId, getUnitTypeId } from './record.services.js';

export const buildResBundleParams = (req, res, next) => {
  const {
    recordData: { recordName }
  } = req.body;

  const MESSAGE_KEY = genKey(+process.env.RES_BUNDLE_MESSAGE_KEY_SIZE);
  const ResBundleParams = [
    [
      req.langTypeID,
      MESSAGE_KEY,
      process.env.USERS_DEFINED_BUNDLE_KEY,
      recordName
    ]
  ];
  req.ResBundleParams = ResBundleParams;
  req.MESSAGE_KEY = MESSAGE_KEY;
  next();
};

export const buildLoUnitQueryParams = catchAsyncErr(async (req, res, next) => {
  const {
    recordData: { recordCode, recordType, recordParentCode }
  } = req.body;

  const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  const loUnitParams = [
    [
      req.MESSAGE_KEY,
      recordCode,
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
    const unitTypeId = queryRes[0][0].TYPE_ID;

    loUnitParams[0][3] = unitTypeId;
  }
  if (req.path === '/child-record') {
    const queryRes = await GetLookUpId(recordType);
    console.log(queryRes[0][0]);
  }
  console.log(req.path);
  req.loUnitParams = loUnitParams;
  next();
});
