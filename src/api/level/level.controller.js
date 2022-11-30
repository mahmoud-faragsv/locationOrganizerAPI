import { StatusCodes } from 'http-status-codes';
import CONSTANTS from '../../../common/messages.js';
import { addToResBundle } from '../../../common/shared.services.js';
import catchAsyncErr from '../../general-utils/catchAsyncErr.js';
import {
  addToLookUp,
  addToTypeValidation,
  getSetOfLevelsIds,
  getFromLookUp,
  getNumOfRecords,
  updateLookUpTitleKeyAndCustomProps,
  updateResBndlMessageValue,
  getLevels
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

//? http://localhost:3000/api/v1/unit/:id GET
export const getUnit = catchAsyncErr(async (req, res) => {
  res.send('getUnit');
});

//? http://localhost:3000/api/v1/level?category=&ouid= GET
export const getAllLevels = catchAsyncErr(async (req, res) => {
  /* the frontend passes a query in the url with a name of OUID that refrences
  the ID of the Organisation which is found in the OU table */
  const { ouid, category } = req.query;
  const { langTypeID, langType } = req;

  const NumOfRecordsRes = await getNumOfRecords([category, langTypeID]);

  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[langType],
    message: CONSTANTS.MSG.GET_ALL_LEVELS[langType],
    data: {
      namesAndNumOfRecords: NumOfRecordsRes[0]
    }
  });
});

//? http://localhost:3000/api/v1/level/:id PATCH
export const updateLevel = catchAsyncErr(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { newLevelName, newCustomProps } = req.body;
  const { langTypeID, langType } = req;

  const oldLevelRes = await getFromLookUp([id]);
  const {
    UNIQUE_KEY: uniqueKey,
    TITLE_KEY: oldLevelName,
    CUSTOM_PROPS: oldCustomProps
  } = oldLevelRes[0][0];

  await updateResBndlMessageValue([
    newLevelName || oldLevelName,
    uniqueKey,
    langTypeID
  ]);
  await updateLookUpTitleKeyAndCustomProps([
    newLevelName || oldLevelName,
    newCustomProps || oldCustomProps,
    id
  ]);

  const updatedLevel = await getFromLookUp([id]);

  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[langType],
    message: CONSTANTS.MSG.UPDATE_LEVEL_SUCCESS[langType],
    data: {
      updatedLevel: updatedLevel[0][0]
    }
  });
});
