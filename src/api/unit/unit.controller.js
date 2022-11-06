import catchAsyncErr from '../../general-utils/catchAsyncErr.js';
import { addToLookUp, addToResBundle, getLangType } from './unit.services.js';
import { genBulkQueryParams } from './unit.utils.js';
// import { createNestedArr } from './unit.utils.js';

//? http://localhost:3000/api/v1/Unit POST
export const createUnit = catchAsyncErr(async (req, res) => {
  /*
   * payload:[levelOb1,levelObject2.....]
   * lang: string in Arab, Eng......
   */
  const { payload, lang } = req.body;

  const resLang = await getLangType(lang);
  const { ID: langTypeID } = resLang[0][0];

  const bundleParams = genBulkQueryParams(langTypeID, payload);
  const resBundle = await addToResBundle(bundleParams);

  // const queryParams = createNestedArr(payload);
  // const response = await addToLookUp(queryParams);

  res.status(201).json({
    status: 'success',
    data: resBundle
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
