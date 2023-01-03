/* eslint-disable no-restricted-globals */
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';

import { catchAsyncErr } from '../../general-utils/index.js';
import {
  addToLoUnit,
  searchOnLoUint,
  updateImage,
  getRecordInfo,
  updateName,
  recordGetAll,
  selectRecordsByOUID,
  updateTime
} from './record.services.js';
import CONSTANTS from '../../../common/messages.js';
// import { addToResBundleAndLOUnit } from './record.utils.js';
import { addToResBundle } from '../../../common/shared.services.js';
// import { deleteImageInPublic } from './record.utils.js';

/**
 * record-route handler responsible for inserting  root records
 * @async
 * @param { http_request} req - http_request
 * @param { http_response} res - http_response
 * @returns { } {status : string, ,message : string}
 */
export const addRootRecord = catchAsyncErr(async (req, res) => {
  console.log('Inside controller.addRootRecord function');

  /**
   * @type {[[{  LANGUAGE_ID: number , MESSAGE_KEY: string, BUNDLE_KEY: string, MESSAGE_VALUE: string}]]}
   * @description array of array describe a new row(record) ready to be saved into the
   * resource_bundle table
   */
  const newResBundleRow = req.ResBundleParams;
  await addToResBundle([newResBundleRow]);

  /**
   * @type { [[{NAME_KEY:string,UNIT_CODE:string, PARENT_ID:number|null, TYPE:number, OUID:number,IMAGE_VSID:string, ADDED_BY: number,UPDATED_BY:number ,ADD_TIME: Date,UPDATE_TIME: Date}]]}
   * @description  array of array describe a new record ready to be saved in the lo_unit table
   */
  const newRootRecord = req.loUnitParams;
  await addToLoUnit([newRootRecord]);

  // await addToResBundleAndLOUnit(newResBundleRow, newRootRecord);

  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    message: CONSTANTS.MSG.ADD_SUCCESS_NEW_RECORD[req.langType]
  });
});
export const addChildRecord = catchAsyncErr(async (req, res, next) => {
  console.log('Inside controller.addChildRecord function');

  /**
   * @type {[[{  LANGUAGE_ID: number , MESSAGE_KEY: string, BUNDLE_KEY: string, MESSAGE_VALUE: string}]]}
   * @description array of array describe a new row(record) ready to be saved into the
   * resource_bundle table
   */
  const newResBundleRow = req.ResBundleParams;
  await addToResBundle([newResBundleRow]);

  /**
   * @type { [[{NAME_KEY:string,UNIT_CODE:string, PARENT_ID:number|null, TYPE:number, OUID:number,IMAGE_VSID:string, ADDED_BY: number,UPDATED_BY:number ,ADD_TIME: Date,UPDATE_TIME: Date}]]}
   * @description  array of array describe a new record ready to be saved in the lo_unit table
   */
  const newRootRecord = req.loUnitParams;
  await addToLoUnit([newRootRecord]);

  // await addToResBundleAndLOUnit(req.ResBundleParams, req.loUnitParams);

  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    message: CONSTANTS.MSG.ADD_SUCCESS_NEW_RECORD[req.langType]
  });
});

// http://domain/api/v1/record/:id
export const uploadLocationMap = catchAsyncErr(async (req, res, next) => {
  console.log('Inside controller.uploadLocationMap function');

  const { code } = req.params;

  await updateImage([req.file.filename, code]);

  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    message: CONSTANTS.MSG.SUCCESS_IMAGE_UPLOADING[req.langType]
  });
});

// http://domain/api/v1/record/:code?ouid&lang GET
export const getRecord = catchAsyncErr(async (req, res, next) => {
  console.log('Inside controller.getRecord function');

  const { langTypeID, langType } = req;
  const { code, ouid } = req.params;

  const recordRes = await getRecordInfo([code, ouid, langTypeID]);

  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[langType],
    message: CONSTANTS.MSG.GET_RECORD_SUCCESS[langType],
    data: {
      record: recordRes[0][0]
    }
  });
});

// http://domain/api/v1/record/:code?lang PATCH
export const updateRecord = catchAsyncErr(async (req, res, next) => {
  console.log('Inside controller.updateRecord function');

  const { langTypeID, langType } = req;
  const { code } = req.params;
  const { newRecordName, ouid } = req.body;

  const record = await recordGetAll([code, ouid]);
  const { NAME_KEY } = record[0][0];
  await updateName([newRecordName, NAME_KEY, langTypeID]);

  const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  await updateTime([time, code, ouid]);

  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[langType],
    message: CONSTANTS.MSG.RECORD_UPDATE_SUCCESS[langType],
    update: await recordGetAll([code, ouid])
  });
});

export const search = catchAsyncErr(async (req, res) => {
  console.log('Inside controller.search function');

  console.log(req.query);
  /**
   * @type {[ADD_TIME:Date,TYPE: string ]} - describe the search options keys
   */
  const queryOptionsKeys = Object.keys(req.query);
  /**
   * @type {[Date, string ]} - describe the search options values
   */
  const queryOptionsValues = Object.values(req.query);

  const resQ = await searchOnLoUint(queryOptionsValues, queryOptionsKeys);
  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    data: resQ[0]
  });
});

export const fetchRecordsByOUID = catchAsyncErr(async (req, res) => {
  const { OUID } = req.query;

  if (isNaN(OUID)) {
    return res.status(400).json('OUID must be a number ');
  }
  const result = await selectRecordsByOUID([+OUID, req.langTypeID]);

  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    data: result[0]
  });
});
