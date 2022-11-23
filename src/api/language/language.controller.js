import { StatusCodes } from 'http-status-codes';
import CONSTANTS from '../../../common/messages.js';
import { catchAsyncErr } from '../../general-utils/index.js';
import { getAllLanguages } from './language.services.js';

export const getLanguages = catchAsyncErr(async (req, res) => {
  const languages = await getAllLanguages();
  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    data: languages[0]
  });
});
export const x = catchAsyncErr(async (req, res) => {});
