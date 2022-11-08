import catchAsyncErr from '../../general-utils/catchAsyncErr.js';
import {
  addToLookUp,
  addToResBundle,
  addToTypeValidation,
  getLangType,
  getSetOfLevelsIds
} from './unit.services.js';
import {
  addIdsToMsgTypes,
  genBulkQueryParams,
  genLookUpBulk,
  genBulkTypeValidation,
  handleUnitsIds
} from './unit.utils.js';

//? http://localhost:3000/api/v1/Unit POST
export const createUnit = catchAsyncErr(async (req, res) => {
  /*
   * payload:[levelOb1,levelObject2.....]
   * lang: string in Arab, Eng......
   */
  const { payload, lang } = req.body;
  // // 1)
  // const resLang = await getLangType(lang);
  // const { ID: langTypeID } = resLang[0][0];

  // // 2)
  // const bundleParams = genBulkQueryParams(langTypeID, payload);
  // await addToResBundle(bundleParams);

  // // 3)

  // const queryParams = genLookUpBulk(payload, bundleParams);
  // await addToLookUp(queryParams);

  // // // 4) insert into TYPE_VALIDATION t
  // const messageKeys = handleUnitsIds(bundleParams);

  const resIds = await getSetOfLevelsIds([
    'msgk_fd9fcf63',
    'msgk_f8762c57',
    'msgk_7769a054',
    'msgk_8e9b1a8b',
    'msgk_fb073ed8'
  ]);

  const bulk = genBulkTypeValidation(resIds[0], payload);
  await addToTypeValidation(bulk);
  res.status(201).json({
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
