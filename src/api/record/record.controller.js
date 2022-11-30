import { StatusCodes } from 'http-status-codes';

import { catchAsyncErr } from '../../general-utils/index.js';
import { addToResBundle } from '../../../common/shared.services.js';
import { addToLoUnit, searchOnLoUint, updateImage } from './record.services.js';
import CONSTANTS from '../../../common/messages.js';

/**
 * record-route handler responsible for inserting  root records
 * @async
 * @param { http_request} req - http_request
 * @param { http_response} res - http_response
 * @returns { } {status : string, ,message : string}
 */
export const addRootRecord = catchAsyncErr(async (req, res) => {
  await addToResBundle([req.ResBundleParams]);
  await addToLoUnit([req.loUnitParams]);

  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    message: CONSTANTS.MSG.ADD_SUCCESS_NEW_RECORD[req.langType]
  });
});
export const addChildRecord = catchAsyncErr(async (req, res, next) => {
  await addToResBundle([req.ResBundleParams]);
  await addToLoUnit([req.loUnitParams]);
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
  const queryOptionsKeys = Object.keys(req.query);
  let queryOptionsValues = [];

  if (req.query.ADD_TIME) queryOptionsValues = req.query.ADD_TIME.split('/');

  if (req.query.TYPE) queryOptionsValues.unshift(req.query.TYPE);

  // console.log(queryOptionsKeys);
  // console.log(queryOptionsValues);
  const resQ = await searchOnLoUint(queryOptionsValues, queryOptionsKeys);
  console.log(resQ[0]);
  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    data: resQ[0]
  });
});
