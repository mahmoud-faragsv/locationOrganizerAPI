import { StatusCodes } from 'http-status-codes';
import { catchAsyncErr } from '../../general-utils/index.js';
import { getLangType } from '../../shared/shared.services.js';

// http://domain/api/v1/record/
export const addRootRecord = catchAsyncErr(async (req, res, next) => {
  const {
    recordData: { recordName, recordCode },
    lang
  } = req.body;

  const resLang = await getLangType(lang);
  const { ID: langTypeID } = resLang[0][0];

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: { recordName, recordCode },
    language: langTypeID
  });
});
export const addChildRecord = catchAsyncErr(async (req, res, next) => {
  const { recordName, recordCode, recordType, recordParentCode } = req.body;

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: { recordName, recordCode, recordType, recordParentCode }
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
