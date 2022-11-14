import moment from 'moment';
import BadRequestErr from '../../errors/badRequest.error.js';
import NotFoundErr from '../../errors/notFound.error.js';
import { catchAsyncErr, genKey } from '../../general-utils/index.js';
import { getMsgKey } from '../../shared/shared.services.js';
import {
  getIdByRecordCode,
  GetLookUpId,
  getUnitTypeId
} from './record.services.js';

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
    //! is the root unit may be more than one category?
    const queryRes = await getUnitTypeId();
    if (queryRes[0].length === 0) {
      return next(new NotFoundErr(`No root unit exist`));
    }
    // if()
    const unitTypeId = queryRes[0][0].TYPE_ID;

    loUnitParams[0][3] = unitTypeId;
  }
  if (req.path === '/child-record') {
    //! 1) when user insert records, what if he inserted values in another language rather than english?
    //! 2) when user insert records.... is it possible to choose multiple parents?
    const queryResponse = await getMsgKey(recordType);
    if (queryResponse[0].length === 0) {
      return next(
        new BadRequestErr(
          ` '${recordType}' incorrect value or not exist in data base `
        )
      );
    }

    const queryRes = await GetLookUpId(queryResponse[0][0].MESSAGE_KEY); // type have to be values in ('City', 'Country','Area',....)
    if (queryRes[0].length === 0) {
      return next(new BadRequestErr(`please Enter a correct unit name`));
    }
    const unitTypeID = queryRes[0][0].ID;
    loUnitParams[0][3] = unitTypeID;

    const qRes = await getIdByRecordCode(recordParentCode);
    if (qRes[0].length === 0) {
      return next(
        new BadRequestErr(` '${recordParentCode}' Incorrect or it not exist`)
      );
    }
    loUnitParams[0][3] = qRes[0][0].ID;
  }
  console.log(loUnitParams);
  req.loUnitParams = loUnitParams;
  next();
});
