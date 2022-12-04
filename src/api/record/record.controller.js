import { StatusCodes } from 'http-status-codes';

import { catchAsyncErr } from '../../general-utils/index.js';
import { addToLoUnit, searchOnLoUint, updateImage } from './record.services.js';
import CONSTANTS from '../../../common/messages.js';
// import { addToResBundleAndLOUnit } from './record.utils.js';
import { addToResBundle } from '../../../common/shared.services.js';

/**
 * record-route handler responsible for inserting  root records
 * @async
 * @param { http_request} req - http_request
 * @param { http_response} res - http_response
 * @returns { } {status : string, ,message : string}
 */
export const addRootRecord = catchAsyncErr(async (req, res) => {
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
  const { code } = req.params;

  await updateImage([req.file.filename, code]);

  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    message: CONSTANTS.MSG.SUCCESS_IMAGE_UPLOADING[req.langType]
  });
});
// eslint-disable-next-line no-debugger
// http://domain/api/v1/record/
export const getAllRecords = catchAsyncErr(async (req, res, next) => {
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: 'contents'
  });
});

// http://domain/api/v1/record/:id
export const updateRecord = catchAsyncErr(async (req, res, next) => {
  res
    .status(200)
    .json({ status: 'success', message: 'record Updated successfully' });
});

// http://domain/api/v1/record/:id
export const deleteRecord = catchAsyncErr(async (req, res, next) => {
  res
    .status(200)
    .json({ status: 'success', message: 'record deleted successfully' });
});

export const search = catchAsyncErr(async (req, res) => {
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
