import { StatusCodes } from 'http-status-codes';
import catchAsyncErr from '../../general-utils/catchAsyncErr.js';
import { addToResBundle } from '../../shared/shared.services.js';
import {
  addToLookUp,
  addToTypeValidation,
  getSetOfLevelsIds
} from './unit.services.js';
import {
  genBulkQueryParams,
  genLookUpBulk,
  genBulkTypeValidation,
  prepareUnitsIds
} from './unit.utils.js';

//? http://localhost:3000/api/v1/Unit POST
export const createUnit = catchAsyncErr(async (req, res) => {
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
  const messageKeys = prepareUnitsIds(bundleParams);

  const resIds = await getSetOfLevelsIds(messageKeys);

  const bulk = genBulkTypeValidation(resIds[0], payload);
  await addToTypeValidation(bulk);
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'Your levels created successfully'
  });
});

//? http://localhost:3000/api/v1/unit/:id GET
export const getUnit = catchAsyncErr(async (req, res) => {
  res.send('getUnit');
});

//? http://localhost:3000/api/v1/Unit GET
export const getAllUnits = catchAsyncErr(async (req, res) => {
  res.send('getAllUnits');
});

//? http://localhost:3000/api/v1/unit/:id PATCH
export const updateUnit = catchAsyncErr(async (req, res) => {
  res.send('updateUnit Unit');
});
