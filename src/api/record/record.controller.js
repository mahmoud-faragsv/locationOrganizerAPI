import { StatusCodes } from 'http-status-codes';

import { catchAsyncErr } from '../../general-utils/index.js';
import { addToResBundle } from '../../shared/shared.services.js';
import { addToLoUnit } from './record.services.js';

// http://domain/api/v1/root-record/
export const addRootRecord = catchAsyncErr(async (req, res, next) => {
  // await addToResBundle(req.ResBundleParams);

  // await addToLoUnit(req.loUnitParams);
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'New record add successfully',
    path: req.path
  });
});
export const addChildRecord = catchAsyncErr(async (req, res, next) => {
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'New record add successfully',
    loUnitParams: req.loUnitParams
  });
});
// http://domain/api/v1/record/:id
export const getRecord = catchAsyncErr(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ status: 'success', data: 'Record get ' });
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
