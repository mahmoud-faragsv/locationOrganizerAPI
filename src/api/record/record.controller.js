import { catchAsyncErr } from '../../general-utils/index.js';

// http://domain/api/v1/record/
export const createRecord = catchAsyncErr(async (req, res, next) => {
  res.status(201).json({
    status: 'success',
    data: 'new Record'
  });
});
// http://domain/api/v1/record/:id
export const getRecord = catchAsyncErr(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Record get ' });
});
// eslint-disable-next-line no-debugger
// http://domain/api/v1/record/
export const getAllRecords = catchAsyncErr(async (req, res, next) => {
  res.status(200).json({
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
