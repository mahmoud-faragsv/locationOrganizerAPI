import { StatusCodes } from 'http-status-codes';
import CONSTANTS from '../../../common/messages.js';
import { addToResBundle } from '../../../common/shared.services.js';
import catchAsyncErr from '../../general-utils/catchAsyncErr.js';
import {
  addToLookUp,
  addToTypeValidation,
  getFromLookUp,
  getNumOfRecords,
  updateLookUpTitleKeyAndCustomProps,
  updateResBndlMessageValue,
  getLevels,
  getLevelsIDs
} from './level.services.js';
import {
  genLookUpBulk,
  genBulkTypeValidation,
  genResourceBundleBulk,
  extractMessageKeys
} from './level.utils.js';

/**
 * @async  - level route handler(controller)
 * @function  responsible for creating the levels for the first time when the client initiate the
 * application with his own levels
 */
export const createLevel = catchAsyncErr(async (req, res, next) => {
  /**
   * @type {[{type:string, parent:[string | null], color: string}]} - the client input which holds the levels data
   */
  // eslint-disable-next-line prefer-destructuring
  const payload = req.body.payload;

  // 1)
  const resourceBundleBulk = genResourceBundleBulk(req.langTypeID, payload);
  await addToResBundle([resourceBundleBulk]);

  // 3)
  const levelsLookUpBulk = genLookUpBulk(payload, resourceBundleBulk);
  await addToLookUp([levelsLookUpBulk]);

  // 4)
  const messageKeys = extractMessageKeys(resourceBundleBulk);

  const levelsIDs = await getLevelsIDs([messageKeys]);

  const typeValidationBulk = genBulkTypeValidation(levelsIDs[0], payload);
  await addToTypeValidation([typeValidationBulk]);

  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    message: CONSTANTS.MSG.ADD_SUCCESS_NEW_LEVELS[req.langType]
  });
});
/**
 * @async  level route handler(controller)
 * @function  responsible for fetching all the levels from the db
 * @param {Object} req - http_request
 */
export const fetchLevels = catchAsyncErr(async (req, res, next) => {
  // const { category } = req.query;

  /**
   * @type {number} -  provided client category value
   */
  // eslint-disable-next-line prefer-destructuring
  const category = +req.query.category;

  const levelsTypes = await getLevels([category, +req.langTypeID]);
  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    data: levelsTypes[0]
  });
});

export const getUnit = catchAsyncErr(async (req, res, next) => {
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
