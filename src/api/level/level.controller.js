import { StatusCodes } from 'http-status-codes';
import CONSTANTS from '../../../common/messages.js';
import { addToResBundle } from '../../../common/shared.services.js';
import catchAsyncErr from '../../general-utils/catchAsyncErr.js';
import {
  addToLookUp,
  addToTypeValidation,
  getFromLookUp,
  updateLookUpTitleKeyAndCustomProps,
  updateResBndlMessageValue,
  getLevels,
  getLevelsIDs,
  getRootLevelType,
  getAllLevelsIds,
  getAllAllowedChildrenIds,
  getRootLevel,
  getAllRecordsAndSort,
  getNumOfRecords
} from './level.services.js';
import {
  genLookUpBulk,
  genBulkTypeValidation,
  genResourceBundleBulk,
  extractMessageKeys,
  filterRootLevelId
} from './level.utils.js';

/**
 * @async  - level route handler(controller)
 * @function  responsible for creating the levels for the first time when the client initiate the
 * application with his own levels
 */
export const createLevel = catchAsyncErr(async (req, res) => {
  console.log('Inside controller.createLevel function');

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
export const fetchAllChildLevels = catchAsyncErr(async (req, res) => {
  console.log('Inside controller.fetchAllChildLevels function');

  /**
   * @type {number} -  provided client category value
   */
  // eslint-disable-next-line prefer-destructuring
  const category = +req.query.category;

  const getLvlsIDs = await getAllLevelsIds(category);
  const getAllowedChildIds = await getAllAllowedChildrenIds(category);

  const rootLevelId = filterRootLevelId(getLvlsIDs[0], getAllowedChildIds[0]);
  const rootLevelRow = await getRootLevel([rootLevelId, +req.langTypeID]);

  const levelsTypes = await getLevels([category, +req.langTypeID]);

  const filteredLevels = levelsTypes[0].filter(
    (level) => level.MESSAGE_VALUE !== rootLevelRow[0][0].MESSAGE_VALUE
  );

  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS[req.langType],
    data: filteredLevels
  });
});

export const getUnit = catchAsyncErr(async (req, res) => {
  res.send('getUnit');
});

// //? http://localhost:3000/api/v1/level?category&lang GET
export const getAllLevels = catchAsyncErr(async (req, res) => {
  console.log('Inside controller.getAllLevels function');

  const { langTypeID, langType } = req;
  const { category } = req.query;

  const NumOfRecordsRes = await getNumOfRecords([category, langTypeID]);

  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[langType],
    message: CONSTANTS.MSG.GET_ALL_LEVELS_SUCCESS[langType],
    data: NumOfRecordsRes[0]
  });
});

//? http://localhost:3000/api/v1/level/:title PATCH
export const updateLevel = catchAsyncErr(async (req, res) => {
  console.log('Inside controller.updateLevel function');

  const { title } = req.params;
  // eslint-disable-next-line prefer-const
  let { newLevelName, newCustomProps, category } = req.body;
  const { langTypeID, langType } = req;

  newCustomProps = JSON.stringify(newCustomProps);

  const oldLevelRes = await getFromLookUp([title, category]);
  const { UNIQUE_KEY: uniqueKey, CUSTOM_PROPS: oldCustomProps } =
    oldLevelRes[0][0];

  if (newLevelName)
    await updateResBndlMessageValue([newLevelName, uniqueKey, langTypeID]);

  if (newLevelName || newCustomProps)
    await updateLookUpTitleKeyAndCustomProps([
      newLevelName || title,
      newCustomProps || oldCustomProps,
      title,
      category
    ]);

  const updatedLevel = await getFromLookUp([newLevelName || title, category]);

  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[langType],
    message: CONSTANTS.MSG.UPDATE_LEVEL_SUCCESS[langType],
    data: updatedLevel[0][0]
  });
});

// http://domain/api/v1/level/:title?sort&ouid&lang&category GET
export const getAllRecords = catchAsyncErr(async (req, res) => {
  console.log('Inside controller.getAllRecords function');

  const { title } = req.params;
  const { langTypeID, langType } = req;
  const { sort, category, ouid } = req.query;

  const levelRes = await getFromLookUp([title, category]);
  const { ID } = levelRes[0][0];

  const allRecordsRes = await getAllRecordsAndSort(
    [ID, langTypeID, ouid],
    sort || 'record_name,1'
  );

  res.status(StatusCodes.OK).json({
    status: CONSTANTS.MSG.SUCCESS[langType],
    message: CONSTANTS.MSG.GET_ALL_RECORDS_SUCCESS[langType],
    data: allRecordsRes[0]
  });
});

export const GetRootLevelType = catchAsyncErr(async (req, res) => {
  console.log('Inside controller.GetRootType function');

  const { OUID } = req.query;
  const queryRes = await getRootLevelType([+OUID, req.langTypeID]);

  res
    .status(StatusCodes.OK)
    .json({ status: CONSTANTS.MSG.SUCCESS[req.langType], data: queryRes[0] });
});
