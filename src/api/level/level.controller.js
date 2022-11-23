import { StatusCodes } from 'http-status-codes';
import CONSTANTS from '../../../common/messages.js';
import { addToResBundle } from '../../../common/shared.services.js';
import catchAsyncErr from '../../general-utils/catchAsyncErr.js';
import {
  addToLookUp,
  addToTypeValidation,
  getLevels,
  getSetOfLevelsIds
} from './level.services.js';
import {
  genBulkQueryParams,
  genLookUpBulk,
  genBulkTypeValidation,
  prepareLevelsIds
} from './level.utils.js';

//? http://localhost:3000/api/v1/level POST
export const createLevel = catchAsyncErr(async (req, res) => {
  /*
   * payload:[levelOb1,levelObject2.....]
   * lang: string in Arab, Eng......
   */
  const { payload } = req.body;

  // 2)
  const bundleParams = genBulkQueryParams(req.langTypeID, payload);
  await addToResBundle([bundleParams]);

  // 3)
  const queryParams = genLookUpBulk(payload, bundleParams);
  await addToLookUp([queryParams]);

  // 4) insert into TYPE_VALIDATION t
  const messageKeys = prepareLevelsIds(bundleParams);

  const resIds = await getSetOfLevelsIds([messageKeys]);

  const bulk = genBulkTypeValidation(resIds[0], payload);
  await addToTypeValidation([bulk]);
  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    message: CONSTANTS.MSG.ADD_SUCCESS_NEW_LEVELS[req.langType]
  });
});
export const fetchLevels = catchAsyncErr(async (req, res) => {
  const { category } = req.query;
  console.log(req);
  const levelsTypes = await getLevels([+category, +req.langTypeID]);
  console.log(levelsTypes[0]);
  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    data: levelsTypes[0]
  });
});
