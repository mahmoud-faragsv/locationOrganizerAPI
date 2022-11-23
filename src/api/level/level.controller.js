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
  getUniqueKey,
  updateLookUpTitleKeyAndCustomProps,
  updateResBndlMessageValue
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
  await addToResBundle(bundleParams);

  // 3)
  const queryParams = genLookUpBulk(payload, bundleParams);
  await addToLookUp(queryParams);

  // 4) insert into TYPE_VALIDATION t
  const messageKeys = prepareLevelsIds(bundleParams);

  const resIds = await getSetOfLevelsIds(messageKeys);

  const bulk = genBulkTypeValidation(resIds[0], payload);
  await addToTypeValidation(bulk);
  res.status(StatusCodes.CREATED).json({
    status: CONSTANTS.MSG.SUCCESS,
    message: CONSTANTS.MSG.ADD_SUCCESS_NEW_LEVELS
  });
});

//? http://localhost:3000/api/v1/unit/:id GET
export const getUnit = catchAsyncErr(async (req, res) => {
  res.send('getUnit');
});

//? http://localhost:3000/api/v1/Unit? GET
export const getAllUnits = catchAsyncErr(async (req, res) => {
  /* the frontend passes a query in the url with a name of OUID that refrences
  the ID of the Organisation which is found in the OU table */
  const { ouid, category } = req.query;
  const { langTypeID } = req.body;

  const NumOfRecordsRes = await getNumOfRecords([category, langTypeID]);

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Level names and number of records found successfully',
    data: {
      namesAndNumOfRecords: NumOfRecordsRes[0]
    }
  });
});

//? http://localhost:3000/api/v1/unit/:id PATCH
export const updateUnit = catchAsyncErr(async (req, res) => {
  /*
  {
    newLevelName: STRING,
    newLevelColor: STRING,
    langTypeID: INT
  }
  */
  const { id } = req.params;
  const { newLevelName, langTypeID, newCustomProps } = req.body;

  const { UNIQUE_KEY: uniqueKey } = await getUniqueKey([id])[0][0];

  await updateResBndlMessageValue([newLevelName, uniqueKey, langTypeID]);
  await updateLookUpTitleKeyAndCustomProps([newLevelName, newCustomProps, id]);

  const updatedLevel = await getFromLookUp([id])[0][0];

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Level has been modified successfully',
    data: {
      updatedLevel
    }
  });
});
